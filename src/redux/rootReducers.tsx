import userSlice from './slice/authSlice';
import eventSlice from './slice/eventSlice';
import newsSlice from './slice/newsSlice';
import securityAlertsSLice from './slice/securityAlertsSlice';
import videoSlice from './slice/videoSlice';

export const reducer = {
  user: userSlice,
  event: eventSlice,
  news: newsSlice,
  securityAlerts : securityAlertsSLice,
  video: videoSlice,
};
