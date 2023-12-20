import Statistical from "../models/statistical.js";
import Booking from '../models/Booking.js'


//get 4 booking top

export const getFourBookingTop = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            {
                $group: {
                    _id: 'tourId', // Tên trường bạn muốn group by
                    count: { $sum: 1 } // Đếm số lượng bản ghi cho mỗi giá trị
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Success",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }

}

//create statistical
export const createStatistical = async (req, res) => {

    const newStatistical = new Statistical({ ...req.body, createdAt: new Date(req.body.order_date) });

    try {
        const savedStatistical = await newStatistical.save();

        res.status(200).json({
            success: true,
            message: "Success",
            data: savedStatistical,
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

//update statistical record
export const updateStatisticalRecord = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedStatistical = await Statistical.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Cập nhật thành công",
            data: updatedStatistical,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Cập nhật thất bại",
        });
    }
}

//get All statistical
export const getAllStatistical = async (req, res) => {
    try {
        const listStatistical = await Statistical.find({});

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}


//get one week statistical
export const getStatisticalOneWeek = async (req, res) => {
    // Find current date 
    const currentDate = new Date()
    let oneWeekAgoDate = new Date(currentDate);
    oneWeekAgoDate.setDate(currentDate.getDate() - 7);

    try {
        const listStatistical = await Statistical.find({
            $and: [
                { createdAt: { $lte: currentDate } },
                { createdAt: { $gte: oneWeekAgoDate } },
            ],
        });

        //2023-12-02T09:30:33.005Z nho hon or bang 2023-12-02T09:26:29.500Z
        //2023-11-25T09:30:33.005Z nho hon or bang 

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

export const getStatisticalOneMonth = async (req, res) => {
    // Find current date 
    const currentDate = new Date()
    let oneWeekAgoDate = new Date(currentDate);

    oneWeekAgoDate.setDate(currentDate.getDate() - 30);

    console.log(currentDate)
    console.log(oneWeekAgoDate)
    try {
        const listStatistical = await Statistical.find({
            $and: [
                { createdAt: { $lte: currentDate } },
                { createdAt: { $gte: oneWeekAgoDate } },
            ],
        });

        //2023-12-02T09:30:33.005Z nho hon or bang 2023-12-02T09:26:29.500Z
        //2023-11-25T09:30:33.005Z nho hon or bang 

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

export const getStatisticalThreeMonth = async (req, res) => {
    // Find current date 
    const currentDate = new Date()
    let oneWeekAgoDate = new Date(currentDate);
    oneWeekAgoDate.setDate(currentDate.getDate() - 90);


    console.log(currentDate)
    console.log(oneWeekAgoDate)

    try {
        const listStatistical = await Statistical.find({
            $and: [
                { createdAt: { $lte: currentDate } },
                { createdAt: { $gte: oneWeekAgoDate } },
            ],
        });

        //2023-12-02T09:30:33.005Z nho hon or bang 2023-12-02T09:26:29.500Z
        //2023-11-25T09:30:33.005Z nho hon or bang 

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

export const getStatisticalStartEndDate = async (req, res) => {

    const startDate = new Date(req.query.start_date)
    const endDate = new Date(req.query.end_date)


    try {
        const listStatistical = await Statistical.find({
            $and: [
                { createdAt: { $lte: endDate } },
                { createdAt: { $gte: startDate } },
            ],
        });

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

//check exist current date
export const checkStaticticalExist = async (req, res) => {
    const currentDate = new Date()

    console.log(currentDate)

    try {
        const listStatistical = await Statistical.find({
            order_date: { $eq: "2023-12-01" }
        });

        res.status(200).json({
            success: true,
            message: "Success",
            length: listStatistical.length,
            data: listStatistical
        });
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Error",
        });
    }
}

/* 
- { order_date: { $lte: currentDate } }: trường này kiểm tra xem trường 'order_date' có nhỏ hơn hoặc 
bằng 'currentDate' hay không '$lte'
- { order_date: { $gte: oneWeekAgoDate } }: điều kiện kiểm tra trường 'order_date' có lớn hơn hoặc 
bằng 'oneWeekAgo' hay không '$gte'

*/