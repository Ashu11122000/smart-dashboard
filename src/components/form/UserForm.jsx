// Import useState hook for managing component state
import { useState } from 'react';

// Import reusable Button component
import Button from '../common/Button';

// UserForm component
export default function UserForm() {

    // State for current form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    // State for storing submitted profile data
    const [savedProfile, setSavedProfile] = useState(null);

    // Handle input field changes
    function handleInputChange(event) {

        // Extract input name attribute
        const fieldName = event.target.name;

        // Extract input current value
        const fieldValue = event.target.value;

        // Update specific field while keeping existing data
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: fieldValue,
        }));
    }

    // Handle form submission
    function handleSubmit(event) {

        // Prevent browser page reload
        event.preventDefault();

        // Save submitted form data
        setSavedProfile(formData);

        // Clear input fields after submission
        setFormData({
            name: '',
            email: '',
        });
    }

    // Return component UI
    return (

        // Main wrapper with vertical spacing
        <div className="space-y-6">

            {/* User form */}
            <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name input wrapper */}
            <div>

                {/* Name label */}
                <label className="block mb-1 font-medium">
                    Name
                </label>

                {/* Name input */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Email input wrapper */}
            <div>

                {/* Email label */}
                <label className="block mb-1 font-medium">
                    Email
                </label>

                {/* Email input */}
                <input
                    type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Submit button */}
                <Button type="submit">
                    Save Profile
                </Button>

            </form>

            {/* Conditional rendering for saved profile */}
            {savedProfile && (

                // Saved profile container
                <div className="bg-gray-50 p-4 rounded-lg border">

                    {/* Saved profile heading */}
                    <h4 className="font-semibold mb-3">
                        Saved Profile
                    </h4>

                    {/* Saved name */}
                    <p>
                        Name: {savedProfile.name}
                    </p>

                    {/* Saved email */}
                    <p>
                        Email: {savedProfile.email}
                    </p>

                </div>
            )}

        </div>
    );
}