import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp } from "firebase/firestore";

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
    });
    const [editingEvent, setEditingEvent] = useState(null);

    // Fetch events from Firestore
    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, "Events"));
            const eventsData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    date: data.date?.toDate() || "", // Convert Firestore Timestamp to JavaScript Date
                };
            });
            setEvents(eventsData);
        };

        fetchEvents();
    }, []);


    // Add a new event to Firestore
    const addEvent = async (e) => {
        e.preventDefault();
        try {
            const eventToAdd = {
                ...newEvent,
                date: new Date(newEvent.date), // Convert input date string to Date object
            };
            await addDoc(collection(db, "Events"), eventToAdd);
            setEvents((prev) => [...prev, { ...eventToAdd, id: "temp-id" }]); // Temporary ID for state
            setNewEvent({
                title: "",
                description: "",
                date: "",
                startTime: "",
                endTime: "",
                location: "",
            });
            alert("Event added successfully!");
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };


    // Delete an event from Firestore
    const deleteEvent = async (id) => {
        try {
            await deleteDoc(doc(db, "Events", id));
            setEvents((prev) => prev.filter((event) => event.id !== id));
            alert("Event deleted successfully!");
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    // Update an event in Firestore
    const updateEvent = async (e) => {
        e.preventDefault();
        try {
            const eventToUpdate = {
                ...editingEvent,
                date: new Date(editingEvent.date), // Convert input date string to Date object
            };
            await updateDoc(doc(db, "Events", editingEvent.id), eventToUpdate);
            setEvents((prev) =>
                prev.map((event) =>
                    event.id === editingEvent.id ? { ...event, ...eventToUpdate } : event
                )
            );
            setEditingEvent(null);
            alert("Event updated successfully!");
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };



    return (
        <div>
            <h2>Events List</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
                        <button onClick={() => setEditingEvent(event)}>Edit</button>
                        <button onClick={() => deleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editingEvent ? (
                <div>
                    <h3>Edit Event</h3>
                    <form onSubmit={updateEvent}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingEvent.title}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, title: e.target.value })
                            }
                        />
                        <textarea
                            placeholder="Description"
                            value={editingEvent.description}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, description: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            value={editingEvent.date}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, date: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            value={editingEvent.startTime}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, startTime: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            value={editingEvent.endTime}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, endTime: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={editingEvent.location}
                            onChange={(e) =>
                                setEditingEvent({ ...editingEvent, location: e.target.value })
                            }
                        />
                        <button type="submit">Save</button>
                        <button onClick={() => setEditingEvent(null)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>Add New Event</h3>
                    <form onSubmit={addEvent}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, description: e.target.value })
                            }
                        />
                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        />
                        <input
                            type="time"
                            value={newEvent.startTime}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, startTime: e.target.value })
                            }
                        />
                        <input
                            type="time"
                            value={newEvent.endTime}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, endTime: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newEvent.location}
                            onChange={(e) =>
                                setNewEvent({ ...newEvent, location: e.target.value })
                            }
                        />
                        <button type="submit">Add Event</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EventsList;
