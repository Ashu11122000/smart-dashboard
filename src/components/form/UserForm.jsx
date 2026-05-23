import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';

export default function UserForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const [savedProfile, setSavedProfile] = useState(null);

    function handleInputChange(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: fieldValue,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        setSavedProfile(formData);

        toast.success('Profile saved successfully!');

        setFormData({
            name: '',
            email: '',
        });
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <Button type="submit">
                    Save Profile
                </Button>
            </form>

            {savedProfile && (
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold mb-3">
                        Saved Profile
                    </h4>

                    <p>Name: {savedProfile.name}</p>
                    <p>Email: {savedProfile.email}</p>
                </div>
            )}
        </div>
    );
}