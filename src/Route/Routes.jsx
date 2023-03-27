
import axios from 'axios';
import InquiryForm from '../Components/Inquiry/InquiryForm/index';
import ViewInquiry from '../Components/Inquiry/InquiryForm/ViewInquiry';
import FactoryDetailInquiry from '../Components/Inquiry/FactoryInquiry/FactoryDetailInquiry';
import FactoryViewInquiry from '../Components/Inquiry/FactoryInquiry/FactoryViewInquiry';
import InquiryContacts from '../Components/Inquiry/InquiryContacts/index';
import FeedbackForm from '../Components/Inquiry/InquiryForm/FeedbackFormInquiry';
import FactoryResponse from '../Components/Inquiry/InquiryForm/FactoryResponse';
import InquiryFeedbackView from '../Components/Inquiry/InquiryForm/InquiryFeedbackView';
import EditInquiryForm from '../Components/Inquiry/InquiryForm/EditInquiryForm';
import BillOfMaterial from '../Components/Inquiry/BillOfMaterial/index';


axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("apiToken");

export const routes = [
                 { path: `${process.env.PUBLIC_URL}/inquiryform`, Component: <InquiryForm/>  },
                 { path: `${process.env.PUBLIC_URL}/viewinquiry`, Component: <ViewInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/factorydetailinquiry`, Component: <FactoryDetailInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/factoryviewinquiry`, Component: <FactoryViewInquiry/>  },
                 { path: `${process.env.PUBLIC_URL}/inquirycontacts`, Component: <InquiryContacts/>  },
                 { path: `${process.env.PUBLIC_URL}/feedbackform`, Component: <FeedbackForm/>}, 
                 { path: `${process.env.PUBLIC_URL}/factoryresponse`, Component: <FactoryResponse/>},
                 { path: `${process.env.PUBLIC_URL}/feedbackview`, Component: <InquiryFeedbackView/>},
                 { path: `${process.env.PUBLIC_URL}/editinquiryform`, Component: <EditInquiryForm/>},
                 { path: `${process.env.PUBLIC_URL}/billofmaterial`, Component: <BillOfMaterial/>},
];


