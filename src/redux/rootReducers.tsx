import userSlice from './slice/authSlice';
import caseStudiesSlice from './slice/caseStudiesSlice';
import eventSlice from './slice/eventSlice';
import formationSlice from './slice/formationSlice';
import newsSlice from './slice/newsSlice';
import securityAlertsSLice from './slice/securityAlertsSlice';
import videoSlice from './slice/videoSlice';
import enterOtpSlice from './slice/enterOtpSlice';

export const reducer = {
  user: userSlice,
  event: eventSlice,
  news: newsSlice,
  securityAlerts : securityAlertsSLice,
  video: videoSlice,
  caseStudies: caseStudiesSlice,
  formation:formationSlice,
  enterOTP : enterOtpSlice
};
