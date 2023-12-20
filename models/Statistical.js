import mongoose from "mongoose";

const Statistical = new mongoose.Schema(
    {
        order_date: {
            type: String,
            required: true,
        },
        sales: {
            type: String,
        },
        profit: {
            type: String
        },
        total_booking: {
            type: String
        },
        createdAt: {
            type: Date
        }
    },
    { timestamps: false }
);

export default mongoose.model("Statistical", Statistical);  