const Endpoint = {
    login: ["method/petromax.api.app_login"],
    dashboard : ["method/petromax.oh.dashboard"],
    activeOrder : ["method/petromax.order_h.get_order_current"],
    cart : ["method/petromax.items.items"],
    history : ["method/petromax.order_h.sivn_history"],
    notification : ["method/petromax.noti.get_notifications"],
    save : ["method/frappe.desk.form.save.savedocs"],
    submit : ["resource/Sales Order"],
    paymentSubmit : ["resource/Payment Entry"],
    invoiceSubmit : ["resource/Sales Invoice"],
    upload_image : ["method/upload_file"]
  };
  
  export default Endpoint;
  