import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';

export interface IUnifiedParking extends Document {
  type: 'private' | 'public' | 'ahuzot_hof';
  name: string;
  owner?: {
    fullName?: string;
    contactPhone?: string;
    userId?: string;
  };
  address?: {
    street?: string;
    buildingNumber?: number;
    city?: string;
    raw?: string;
    codes?: {
      k_rechov?: number;
      ms_bait?: number;
      oid_han?: number;
      oid_hof?: number;
    };
  };
  location?: {
    x?: number;
    y?: number;
    lat?: number;
    lon?: number;
  };
  capacity?: {
    total?: number;
    reserved?: number;
    disabled?: number;
    floors?: number;
  };
  pricing?: {
    entry?: number;
    day?: string;
    night?: string;
    notes?: string;
  };
  availability?: {
    status?: string;
    updatedAt?: Date;
  };
  lotArea?: number;
  usageType?: string;
  uniqueId?: string;
  dateImport?: Date;
  isActive?: boolean;
  creation_source: 'tlv-api' | 'get-parking';
}

const unifiedParkingSchema = new Schema<IUnifiedParking>({
  type: {
    type: String,
    enum: ['private', 'public', 'ahuzot_hof'],
    required: true,
  },
  name: { type: String, required: true },
  owner: {
    fullName: String,
    contactPhone: String,
    userId: String,
  },
  address: {
    street: String,
    buildingNumber: Number,
    city: String,
    raw: String,
    codes: {
      k_rechov: Number,
      ms_bait: Number,
      oid_han: Number,
      oid_hof: Number,
    },
  },
  location: {
    x: Number,
    y: Number,
    lat: Number,
    lon: Number,
  },
  capacity: {
    total: Number,
    reserved: Number,
    disabled: Number,
    floors: Number,
  },
  pricing: {
    entry: Number,
    day: String,
    night: String,
    notes: String,
  },
  availability: {
    status: String,
    updatedAt: Date,
  },
  lotArea: Number,
  usageType: String,
  uniqueId: String,
  dateImport: Date,
  isActive: Boolean,
  creation_source: {
    type: String,
    enum: ['tlv-api', 'get-parking'],
    required: true,
  },
});

export const UnifiedParkingModel = mongoose.model<IUnifiedParking>(
  'UnifiedParking',
  unifiedParkingSchema
);

export type UnifiedParking = InferSchemaType<typeof unifiedParkingSchema>;
