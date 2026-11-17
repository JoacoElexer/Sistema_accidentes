"use strict";

const AppError = require("../utils/appError");

const ALLOWED_CATEGORIES=[
    "bache",
    "alumbrado",
    "basura",
    "fuga",
    "accidente"
];

const ALLOWED_STATUSES= [
    "pendiente",
    "atendido"
];

const ALLOWED_FIELDS=[
    "title",
    "category",
    "description",
    "status",
    "latitude",
    "longitude"
];

//Validacion del Body
function validateIncidentPayload(options= {}){
    const {partial = false} = options;

    return function incidentPayloadValidator(req, res, next){
        const errors=[];
        const body = req.body || {};

        const providedFields = ALLOWED_FIELDS.filter(
            (field) => body[field] !== undefined
        );

        if (partial && providedFields.length === 0){
            errors.push("Debes proporcionar al menos un campo para actualizar")
        }

        if(!partial){
            ALLOWED_FIELDS.forEach((field)=>{
                if(
                    body[field] === undefined ||
                    body[field] === null ||
                    body[field] === ""
                ){
                    errors.push(`El campo "${field}" es obligatorio`)
                }
            });
        }
        //Titulo
        if(body.title !== undefined){
            if(typeof body.title !== "string" || body.title.trim().length<4){
                errors.push("El titulo debe contener al menos 4 caracteres.")
            }

            if(typeof body.title !== "string" || body.title.trim().length > 80){
                errors.push("El titulo no debe superar los 80 caracteres")
            }
        }
        //Categoria
        if(
            body.category !== undefined &&
            !ALLOWED_CATEGORIES.includes(body.category)
        ){
            errors.push(
                `La categoria debe ser una de las siguientes: ${ALLOWED_CATEGORIES.join(", ")}.`
            )
        }

        //descripcion
        if(body.description !== undefined){
            if(typeof body.description !== "string" || body.description.trim().length<10){
                errors.push("La descripcion debe contener al menos 10 caracteres.")
            }

            if(typeof body.description !== "string" || body.description.trim().length > 250){
                errors.push("La descripcion no debe superar los 250 caracteres")
            }
        }

        if(
            body.status !== undefined &&
            !ALLOWED_STATUSES.includes(body.status)
        ){
            errors.push(
                `El estado debe ser uno de los siguientes: ${ALLOWED_STATUSES.join(" o ")}.`
            )
        }

        //latitud
        if(body.latitude !== undefined){
            const latitude = Number(body.latitude);

            if(!Number.isFinite(latitude)){
                errors.push("La latitud debe ser numerica")

            }else if(latitude <-90 || latitude > 90){
                errors.push("la latitud debe estar entre -90 y 90")
            }else{
                req.body.latitude = latitude
            }
        }
        //Longitud
        if(body.longitude !== undefined){
            const longitude = Number(body.longitude);

            if(!Number.isFinite(longitude)){
                errors.push("La longitud debe ser numerica")

            }else if(longitude <-180 || longitude > 180){
                errors.push("la longitud debe estar entre -180 y 180")
            }else{
                req.body.longitude = longitude
            }
        }

        const unknownFields = Object.keys(body).filter(
            (field) => !ALLOWED_FIELDS.includes(field)
        );

        if(unknownFields.length > 0){
            errors.push(
                `Los siguientes campos no son permitidos: ${unknownFields.join(", ")}`
            )
        }

        if(errors.length > 0){
            return next(
                new AppError(400, "La informacion enviada no es valida", errors)
            );
        }

        next();
    }
}

function validateIncidentQuery(req,res,next){
    const {search, category, status} = req.query;

    const errors = [];

    if(search !== undefined && typeof search !== "string"){
        errors.push("El parametro search debe ser texto");
    }

    if(
        category !== undefined &&
        category !== "all" &&
        !ALLOWED_CATEGORIES.includes(category)
    ){
        errors.push("categoria de filtrado no es valida")
    }

    if(
        status !== undefined &&
        status !== "all" &&
        !ALLOWED_STATUSES.includes(status)
    ){
        errors.push("El estado de la categoria no es valido")
    }

    if(errors.length >0 ){
        return next(
            new AppError(400, "Los parametros de consulta no son validos", errors)
        )
    }

    next();
}

module.exports ={
    validateIncidentPayload,
    validateIncidentQuery,
    ALLOWED_CATEGORIES,
    ALLOWED_STATUSES
}