import mongoose from 'mongoose'


const Schema = mongoose.Schema


const commentsSchema = new Schema({
  comment: String,
  author: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const galaxySchema = new Schema({
  name: {type: String, required: true},
  imgUrl: String,
  description: String,
  comments: [commentsSchema],
  planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
  createdBy: {type: Schema.Types.ObjectId,ref: 'Profile'}
}, {
  timestamps: true
})

const Galaxy = mongoose.model('Galaxy', galaxySchema)

export {
  Galaxy
}