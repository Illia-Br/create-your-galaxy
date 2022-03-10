import mongoose from "mongoose"


const Schema = mongoose.Schema

const planetSchema = new Schema({
  type: {type: String, enum: ['Planet', 'Moon', 'Star', 'Asteroid'], defult: 'Planet'},
  name: {type: String, required: true},
  imgUrl: String,
  size: Number,
  shared: Boolean,
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Planet = mongoose.model('Planet', planetSchema)

export {
  Planet
}