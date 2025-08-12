import  { useState, useEffect } from 'react'
import Navigation from './Navigation'
import { User, Save } from 'lucide-react'

export default function Profile({ user, onLogout }) {
  const [profile, setProfile] = useState({
    name: user.name,
    age: '',
    gender: '',
    phone: '',
    address: '',
    bloodType: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: '',
    insurance: ''
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem(`profile_${user.id}`)
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [user.id])

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-8">
            <User className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Health Profile</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
              <select
                value={profile.bloodType}
                onChange={(e) => handleChange('bloodType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              <input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
              <textarea
                value={profile.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
              <textarea
                value={profile.medications}
                onChange={(e) => handleChange('medications', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                value={profile.conditions}
                onChange={(e) => handleChange('conditions', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
                saved 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save className="h-5 w-5" />
              <span>{saved ? 'Saved!' : 'Save Profile'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 