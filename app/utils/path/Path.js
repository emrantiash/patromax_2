const Endpoint = {
    login: ["method/petromax.api.app_login"],
    // login : ["method/petromax.opi.app_login"],
    varify : ["method/petromax.kpi.otp_verify"],
    dashboard : ["method/petromax.oh.dashboard"],
    activeOrder : ["method/petromax.order_h.get_order_current"],
    cart : ["method/petromax.items.items"],
    history : ["method/petromax.order_h.sivn_history"],
    // notification : ["method/petromax.noti.get_notifications"],
    notification : ["method/petromax.noti_get.petromax_status_change_feed"],
    save : ["method/frappe.desk.form.save.savedocs"],
    submit : ["resource/Sales Order"],
    paymentSubmit : ["resource/Payment Entry"],
    invoiceSubmit : ["resource/Sales Invoice"],
    upload_image : ["method/upload_file"],
    bank_name : ["method/frappe.desk.search.search_link"]
  };
  
  export default Endpoint;


//   user: 100006@demo.com
// PWD: demo12345@
  