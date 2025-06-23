import mongoose, { Schema, Document } from 'mongoose';

// Define the Task interface
export interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create the mongoose schema
const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { 
      type: String, 
      enum: ['todo', 'in-progress', 'completed'], 
      default: 'todo' 
    },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high'], 
      default: 'medium' 
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

// Check if the model exists before creating it
export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
