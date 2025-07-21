import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useSelector } from "react-redux";

export const i18n = new I18n({
  en: { 
  Home : "Home",
  Profile : "Profile",
  Statement : "Statement",
  MY_ACCOUNT : "MY Account",
  History : "History",
  Cart : "Cart",
  Notification : "Notification",
  Active : "Active",
  Orders : "Orders",
  Past : "Past",
  Total: "Total", 
  Proceed: "Proceed", 
  Proceed_without_payment : "Skip payment",
  Submit: "Submit" ,
  Continue : "Continue",
  Bank_Information : "Payment Information",
  Bank_Information : "Bank Information",
  User_Account : "User Account",
  Bank_Account : "Bank Account",
  Add_Attachment : "Add Attachment",
  Select_Option : "Select Option",
  Image : "Image"
},
  bn: { 
  Total: "মোট", 
  Home : "বাড়ি",
  Profile : "প্রোফাইল",
  Statement : "বিবৃতি",
  MY_ACCOUNT : "আমার অ্যাকাউন্ট",
  History : "ইতিহাস",
  Cart : "কার্ট",
  Notification : "বিজ্ঞপ্তি",
  Active : "সক্রিয়",
  Orders : "অর্ডার",
  Past : "অতীত",
  Proceed: "এগিয়ে যান", 
  Proceed_without_payment : "পেমেন্ট ছাড়াই এগিয়ে যান",
  Submit: "জমা দিন",
  Continue : "চালিয়ে যান",
  Bank_Information : "ব্যাংক তথ্য",
  User_Account : "ব্যবহারকারীর অ্যাকাউন্ট",
  Bank_Account : "ব্যাঙ্ক অ্যাকাউন্ট",
  Add_Attachment : "সংযুক্তি যোগ করুন",
  Select_Option : "বিকল্প নির্বাচন করুন",
  Image : "ছবি"
},
});

//   i18n.locale = getLocales()[1].languageCode

// console.log(i18n.t('Total'));
