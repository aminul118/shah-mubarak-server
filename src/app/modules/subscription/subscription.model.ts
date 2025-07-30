import { model, Schema } from 'mongoose';
import { ISubscription } from './subscription.interface';

const subscriptionSchema = new Schema<ISubscription>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export { Subscription };
