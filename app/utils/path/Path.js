const Endpoint = {
  // login: ["method/petromax.api.app_login"],
  login: ["method/petromax.opi.app_login"],
  varify: ["method/petromax.kpi.otp_verify"],
  dashboard: ["method/petromax.oh.dashboard"],
  activeOrder: ["method/petromax.order_h.get_order_current"],
  cart: ["method/petromax.items.items"],
  history: ["method/petromax.order_h.sivn_history"],
  // notification : ["method/petromax.noti.get_notifications"],
  notification: ["method/petromax.noti_get.petromax_status_change_feed"],
  save: ["method/frappe.desk.form.save.savedocs"],
  submit: ["resource/Sales Order"],
  paymentSubmit: ["resource/Payment Entry"],
  invoiceSubmit: ["resource/Sales Invoice"],
  upload_image: ["method/upload_file"],
  payment_method: ["method/frappe.desk.search.search_link"],
  payment_entries : ["method/frappe.desk.reportview.get"],
  bank_name : ["method/erpnext.accounts.utils.get_children"],
  wareHouse : ["method/petromax.ware.house"],
  outstanding : ["method/erpnext.accounts.doctype.payment_entry.payment_entry.get_payment_entry"],
  makelogout : ["method/petromax.log.out"]
};

export default Endpoint;

