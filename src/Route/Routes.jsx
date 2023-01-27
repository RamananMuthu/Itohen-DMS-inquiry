
import axios from 'axios';
import InquiryForm from '../Components/Inquiry/InquiryForm/index';
import ViewInquiry from '../Components/Inquiry/InquiryForm/ViewInquiry';
import FactoryDetailInquiry from '../Components/Inquiry/FactoryInquiry/FactoryDetailInquiry';
import FactoryViewInquiry from '../Components/Inquiry/FactoryInquiry/FactoryViewInquiry';
import InquiryContacts from '../Components/Inquiry/InquiryContacts/index';
import FeedbackForm from '../Components/Inquiry/InquiryForm/FeedbackFormInquiry';
import FactoryResponse from '../Components/Inquiry/InquiryForm/FactoryResponse';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("apiToken");

export const routes = [

        /*************************************  STAGING *************************************/
                 { path: `${process.env.PUBLIC_URL}/inquiryform`, Component: <InquiryForm/>  },
                 { path: `${process.env.PUBLIC_URL}/viewinquiry`, Component: <ViewInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/factorydetailinquiry`, Component: <FactoryDetailInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/factoryviewinquiry`, Component: <FactoryViewInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/inquirycontacts`, Component: <InquiryContacts/>  },
                 { path: `${process.env.PUBLIC_URL}/feedbackform`, Component: <FeedbackForm/>}, 
                 { path: `${process.env.PUBLIC_URL}/factoryresponse`, Component: <FactoryResponse/>},
        /************************************************************************************/


        /*************************************  LOCAL *************************************/
                // { path: `${process.env.PUBLIC_URL}/inquiryform`, Component: <InquiryForm/>  },
                // { path: `${process.env.PUBLIC_URL}/inquiry/viewinquiry`, Component: <ViewInquiry/>  },
                // { path: `${process.env.PUBLIC_URL}/inquiry/factorydetailinquiry`, Component: <FactoryDetailInquiry/>  },
                // { path: `${process.env.PUBLIC_URL}/inquiry/factoryviewinquiry`, Component: <FactoryViewInquiry/>  },
                // { path: `${process.env.PUBLIC_URL}/inquirycontacts`, Component: <InquiryContacts/>  },
                // { path: `${process.env.PUBLIC_URL}/feedbackform`, Component: <FeedbackForm/>}, 
                // { path: `${process.env.PUBLIC_URL}/inquiry/factoryresponse`, Component: <FactoryResponse/>}
        /************************************************************************************/

];


