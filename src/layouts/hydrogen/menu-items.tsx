import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiFileImageDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  // PiImageDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiStackDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiBoundingBoxDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiMagicWandDuotone,
  PiCalendarPlusDuotone,
} from 'react-icons/pi';
import { FaRegNewspaper } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";




// Note: do not add href in the label object, it is rendering as label
export const menuItems = [

  {
    name:'Events',
    href:routes.event,
    icon:<MdEvent />,
  },
  {
    name: 'News',
    href: routes.news,
    icon:<FaRegNewspaper />,
  },
  {
    name:'Security Alerts',
    href:routes.securityAlerts,
    icon:<PiShieldCheckDuotone />,
  },
  {
    name:'Videos',
    href:routes.videos,
    icon:<PiFileImageDuotone />,
  }
  
 
];
