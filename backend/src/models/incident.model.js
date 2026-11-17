"use strict";

const mongoose = require("mongoose");

const {
    ALLOWED_CATEGORIES,
    ALLOWED_STATUSES
} = require("../middlewares/incident.validator");

const incidentSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
            maxlength: 80
        },
        description:{
            type: String,
            required: true,
            trim: true,
            maxlength: 250
        },
        category:{
            type: String,
            required: true,
            enum: ALLOWED_CATEGORIES
        },
        status:{
            type: String,
            enum: ALLOWED_STATUSES,
            default: "pendiente"
        },


        //ubicacion en formato GEOJSON: [longitud, latitud]
        location:{
            type:{
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates:{
                type:[Number],
                required:true
            }
        }
    },
    {
        
        timestamps:true,

        toJSON:{
            versionKey: false,
            transform(doc, ret){
                ret.id = ret._id.toString();
                delete ret._id;
                return ret;
            }
        }
    }
)

incidentSchema.index({location: "2dsphere"});

const IncidentModel = mongoose.model("Incident", incidentSchema);

module.exports= IncidentModel;