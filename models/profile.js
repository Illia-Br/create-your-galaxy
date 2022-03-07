import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  planets: [{type: Schema.Types.ObjectId, ref: "Planet"}],
  galaxies: [{type: Schema.Types.ObjectId, ref: "Galaxy"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
