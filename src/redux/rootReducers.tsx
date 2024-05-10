import userSlice from './slice/authSlice';
import eventSlice from './slice/eventSlice';
import newsSlice from './slice/newsSlice';

export const reducer = {
  user: userSlice,
  event: eventSlice,
  news: newsSlice,
};
