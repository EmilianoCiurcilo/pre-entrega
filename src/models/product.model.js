import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        index: { name: "idx_title" },
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 50, "El nombre debe tener como máximo 50 caracteres" ],
    },
    description: {
        type: String,
        required: [ true, "La descripcion es obligatoria" ],
    },
    code: {
        type: String,
        required: [ true, "El codigo identificador es obligatorio" ],
        unique: true,
        trim: true,
        minLength: [ 6, "El codigo debe tener 6 caracteres" ],
        maxLength: [ 6, "El codigo debe tener 6 caracteres" ],
        validate: {
            validator: async function (code) {
                const countDocuments = await this.model("products").countDocuments({
                    _id: { $ne: this._id },
                    code,
                });
                return countDocuments === 0;
            },
            message: "Ya existe este codigo",
        },
    },
    price: {
        type: Number,
        required: [ true, "El precio es obligatorio" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    category: {
        type: String,
        required: [ true, "La categoria es obligatoria" ],
    },
    thumbnail: {
        type: String,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;