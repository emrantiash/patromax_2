import {
  ScrollView,
  View,
  StyleSheet,
  DimensionValue,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Text,
  Icon,
  ArrowRightIcon,
  Divider,
} from "@gluestack-ui/themed";
import {
  storeTotal,
  postOrder,
  submitOrder,
  submitPayment,
  submitInvoice,
  image_upload,
} from "../../redux/slices/cartSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import BadgeSymbol from "../../component/badge/Badge";
import { router } from "expo-router";
import ButtonBox from "../../component/button/Button";
import useConfig from "../../lib/hook/config";
import PSpinner from "../../component/spinner/Spinner";
import * as Clipboard from "expo-clipboard";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function OrderDetails() {
  const config = useConfig();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderReducer.data);
  const image = useSelector((state) => state.cartReducer.image);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  const makeCallPayment = () => {
    // console.log(data?.due?.toString());
    dispatch(storeTotal(data?.due?.toString() > 0 ? data?.due : data.total));
    router.push("screen/uploadScreen/UploadScreen");
  };

  const call_sales_order = () => {
    setIsLoading(true);
    // console.log("==sales order comes ====");
    // console.log(data);
    // // console.log(data)

    const thisdata = {
      docstatus: 0,
      name: "new-sales-order-item-jhugcvdhfs",
      doctype: "Sales Order",
      __islocal: 1,
      __unsaved: 1,
      owner: "Administrator",
      title: config[2],
      naming_series: "SAL-ORD-.YYYY.-",
      order_type: "Sales",
      transaction_date: data.date_use, //"2025-07-09",
      custom_petromax_status: "",
      company: "Petromax",
      skip_delivery_note: 0,
      currency: "BDT",
      selling_price_list: "Standard Selling",
      price_list_currency: "BDT",
      ignore_pricing_rule: 0,
      reserve_stock: 0,
      items: data.items.map((_data) => ({
        ..._data,
        docstatus: 0,
        doctype: "Sales Order Item",
        // name: "new-sales-order-item-jhugcvdhfs",
        __islocal: 1,
        __unsaved: 1,
        owner: "Administrator",
        ensure_delivery_based_on_produced_serial_no: 0,
        is_stock_item: 0,
        reserve_stock: 1,
        stock_uom: "PCS",
        stock_reserved_qty: 0,
        margin_type: "",
        is_free_item: 0,
        grant_commission: 1,
        delivered_by_supplier: 0,
        against_blanket_order: null,
        page_break: 0,
        cost_center: "Main - PM",
        // parent: "new-sales-order-wnymarxygf",
        parentfield: "items",
        parenttype: "Sales Order",
        idx: 1,
        qty: _data.quantity,
        conversion_factor: 1,
        stock_qty: 1,
        // price_list_rate: _data.price,
        // base_price_list_rate: _data.basePrice,
        // margin_rate_or_amount: 0,
        // rate_with_margin: 0,
        // discount_amount: 65,
        // distributed_discount_amount: 0,
        // base_rate_with_margin: 0,
        // rate: _data.basePrice,
        // amount: _data.price,
        // base_rate: _data.basePrice,
        // base_amount: _data.basePrice,
        // stock_uom_rate: _data.basePrice,
        // net_rate: _data.price,
        // net_amount: _data.price,
        // base_net_rate: _data.basePrice,
        // base_net_amount: _data.price,
        billed_amt: 0,
        valuation_rate: 0,
        gross_profit: 0,
        weight_per_unit: 0,
        total_weight: 0,
        blanket_order_rate: 0,
        actual_qty: 0,
        company_total_stock: 0,
        projected_qty: 0,
        ordered_qty: 0,
        planned_qty: 0,
        production_plan_qty: 0,
        work_order_qty: 0,
        delivered_qty: 0,
        produced_qty: 0,
        returned_qty: 0,
        picked_qty: 0,
        item_code: _data.item,
        weight_uom: null,
        barcode: null,
        // pricing_rules: '[\n "PRLE-0002"\n]',
        item_name: _data.name,
        // description: "",
        image: _data.image,
        warehouse: "Stores - PM",
        income_account: "Sales - PM",
        expense_account: "Cost of Goods Sold - PM",
        discount_account: null,
        provisional_expense_account: null,
        has_serial_no: 0,
        has_batch_no: 0,
        batch_no: null,
        uom: "PCS",
        min_order_qty: "",
        discount_percentage: 5,
        update_stock: 0,
        is_fixed_asset: 0,
        last_purchase_rate: 0,
        transaction_date: data.date_use,
        bom_no: null,
        item_group: "Cylinder",
        brand: null,
        manufacturer: null,
        manufacturer_part_no: null,
        item_tax_rate: "{}",
        customer_item_code: null,
        has_margin: true,
        free_item_data: [],
        // child_docname: "new-sales-order-item-jhugcvdhfs",
        validate_applied_rule: 0,
        price_or_product_discount: "Price",
        pricing_rule_for: "Discount Percentage",
        has_pricing_rule: 1,
        delivery_date: "2026-07-09",
      })),

      taxes: [],
      disable_rounded_total: 0,
      apply_discount_on: "Grand Total",
      packed_items: [],
      pricing_rules: [],
      payment_schedule: [],
      status: "Draft",
      delivery_status: "Not Delivered",
      billing_status: "Not Billed",
      sales_team: [],
      group_same_items: 0,
      is_internal_customer: 0,
      party_account_currency: "BDT",
      advance_paid: 0,
      conversion_rate: 1,
      plc_conversion_rate: 1,
      company_address: null,
      company_address_display: null,
      // base_net_total: data.total,
      // net_total: data.total,
      // base_total: data.total,
      // total: data.total,
      total_qty: 1,
      // grand_total: data.total,
      // base_grand_total: data.total,
      total_taxes_and_charges: 0,
      base_total_taxes_and_charges: 0,
      // rounded_total: data.total,
      rounding_adjustment: 0,
      base_rounding_adjustment: 0,
      // base_rounded_total: data.total,
      in_words: "",
      base_in_words: "",
      // base_discount_amount: 0,
      // amount_eligible_for_commission: data.total,
      total_commission: null,
      tax_id: null,
      customer_name: config[2],
      represents_company: null,
      customer: config[2],
      customer_address: null,
      address_display: null,
      shipping_address_name: null,
      shipping_address: null,
      tax_category: "",
      contact_person: null,
      contact_display: null,
      contact_email: null,
      contact_mobile: null,
      contact_phone: null,
      // customer_group: "Gold (5% Discount)",
      territory: null,
      language: "en",
      payment_terms_template: null,
      total_net_weight: 0,
    };
    // console.log(thisdata)
    const option = { doc: JSON.stringify(thisdata), action: "Save" };

    dispatch(postOrder(option)).then(function (e) {
      console.log(e.payload.docs[0].name);
      e.payload.docs[0].name
        ? (_confirm(e.payload.docs[0].name)
          // console.log("===sales order created===")
          )
        : console.log("Something went wrong with order save");
    });
  };

  const _confirm = (name) => {
    const tail = "/" + name;
    const _data = {
      docstatus: 1,
    };
    const option = [tail, _data];

    dispatch(submitOrder(option)).then(function (e) {
      // console.log("==the paid amount is ==", data)
      data.paid_amount == 0 ? salesInvoice( " " , e.payload.data.name) :
      e.payload.data.name
        ? (payment(e.payload.data.name)
          // console.log("==sales order confirmed==")
          )
        : console.log("Something went wrong with order submit ");
    });
  };

  const payment = (reference_name) => {
    // console.log("==payment ===come===", reference_name, data.total);
    // console.log(reference_name)
    // console.log(mydate)
    const thisdata = {
      reference_no: data.deposit,
      reference_date: data.date_use,
      owner: "Administrator",
      docstatus: 0,
      idx: 0,
      naming_series: "ACC-PAY-.YYYY.-",
      payment_type: "Receive",
      payment_order_status: "Initiated",
      posting_date: data.date_use,
      company: "Petromax",
      party_type: "Customer",
      party: config[2],
      party_name: config[2],
      book_advance_payments_in_separate_party_account: 0,
      reconcile_on_advance_payment_date: 0,
      party_balance: config[3].account_balance,
      paid_from: "Debtors - PM",
      paid_from_account_type: "Receivable",
      paid_from_account_currency: "BDT",
      paid_from_account_balance: Number(data.paid_amount),
      paid_to: "Cash - PM",
      paid_to_account_type: "Cash",
      paid_to_account_currency: "BDT",
      paid_to_account_balance: Number(data.paid_amount),
      paid_amount: Number(data.paid_amount),
      base_paid_amount: Number(data.paid_amount),
      received_amount: Number(data.paid_amount),
      paid_amount_after_tax: 0,
      source_exchange_rate: 1,
      base_paid_amount_after_tax: 0,
      received_amount_after_tax: 0,
      target_exchange_rate: 1,
      base_received_amount: Number(data.paid_amount),
      base_received_amount_after_tax: 0,
      total_allocated_amount: Number(data.paid_amount),
      base_total_allocated_amount: Number(data.paid_amount),
      unallocated_amount: 0,
      difference_amount: 0,
      apply_tax_withholding_amount: 0,
      base_total_taxes_and_charges: 0,
      total_taxes_and_charges: 0,
      reference_date: data.date_use,
      status: "Draft",
      custom_remarks: 0,
      is_opening: "No",
      doctype: "Payment Entry",
      references: [
        {
          docstatus: 0,
          idx: 1,
          reference_doctype: "Sales Order",
          reference_name: reference_name,
          payment_term_outstanding: 0,
          total_amount: data.total,
          outstanding_amount: data.total,
          allocated_amount: Number(data.paid_amount),
          exchange_rate: 1,
          exchange_gain_loss: 0,
          account: "Debtors - PM",
          payment_request_outstanding: 0,
          parentfield: "references",
          parenttype: "Payment Entry",
          doctype: "Payment Entry Reference",
          __islocal: 1,
          parent: "new-payment-entry-yzskdlfzhq",
          name: "new-payment-entry-reference-guhklrnkfv",
        },
      ],
      deductions: [],
      taxes: [],
      __islocal: 1,
      __unsaved: 1,
      name: "new-payment-entry-yzskdlfzhq",
      __last_sync_on: "2025-07-09T11:27:15.065Z",
      mode_of_payment: "Cash",
    };

    // console.log("====this data ===="+JSON.stringify(thisdata))
    const option = { doc: JSON.stringify(thisdata), action: "Save" };

    dispatch(postOrder(option)).then(function (e) {
      // console.log(JSON.stringify(e.payload));
      if (e.payload.docs[0].name) {
        const name = e.payload.docs[0].name;
        console.log(image)
        if(image){
          let formData = new FormData();
          // let filename = image.split('/').pop();
          let match = /\.(\w+)$/.exec(image);
          let type = match ? `image/${match[1]}` : `image`;
          formData.append('file', {
            uri: image,
            name: e.payload.docs[0].name+'upload.jpg',
            type: type ||  'image/jpeg',
          });
          formData.append("is_private", "1");
          formData.append("folder", "Home");
          formData.append("doctype", "Payment Entry");
          formData.append("docname", e.payload.docs[0].name);
          
          dispatch(image_upload(formData)).then(function (e) {
            // console.log("image uploaded");
          });
        }
        
        const tail = "/" + name;
        const data = {
          docstatus: 1,
        };
        const option = [tail, data];

        dispatch(submitPayment(option)).then(function (e) {
          // console.log("===submit paymenty ===", e.payload.data.name);
          if (e.payload.data.name) {
           
            salesInvoice(e.payload.data.name, reference_name);
          } else handleToast("Something went wrong with payment submit");
        });
      } else handleToast("Something went wrong with payment save");
    });
  };

  const salesInvoice = (payment_name, sales_order) => {
    // console.log("sales invoice comes", sales_order, payment_name);

    let thisdata = {
      owner: "Administrator",
      docstatus: 0,
      idx: 0,
      naming_series: "ACC-SINV-.YYYY.-",
      customer: config[2],
      customer_name: config[2],
      company: "Petromax",
      posting_date: data.date_use,
      posting_time: data.time,
      set_posting_time: 0,
      due_date: "2026-07-09",
      is_pos: 0,
      is_consolidated: 0,
      is_return: 0,
      update_outstanding_for_self: 1,
      update_billed_amount_in_sales_order: 0,
      update_billed_amount_in_delivery_note: 1,
      is_debit_note: 0,
      currency: "BDT",
      conversion_rate: 1,
      selling_price_list: "Standard Selling",
      price_list_currency: "BDT",
      plc_conversion_rate: 1,
      ignore_pricing_rule: 0,
      update_stock: 0,
      total_qty: 1,
      total_net_weight: 0,
      // base_total: data.total,
      // base_net_total: data.total,
      // total: data.total,
      // net_total: data.total,
      // tax_category: "",
      // base_total_taxes_and_charges: 0,
      // total_taxes_and_charges: 0,
      // base_grand_total: data.total,
      // base_rounding_adjustment: 0,
      // base_rounded_total: data.total,
      // base_in_words: "",
      // grand_total: data.total,
      // rounding_adjustment: 0,
      // use_company_roundoff_cost_center: 0,
      // rounded_total: data.total,
      // in_words: "",
      // total_advance: 0,
      // outstanding_amount: 0,
      // disable_rounded_total: 0,
      apply_discount_on: "Grand Total",
      base_discount_amount: 0,
      is_cash_or_non_trade_discount: 0,
      additional_discount_percentage: 0,
      discount_amount: 0,
      total_billing_hours: 0,
      total_billing_amount: 0,
      base_paid_amount: 0,
      paid_amount: 0,
      base_change_amount: 0,
      change_amount: 0,
      allocate_advances_automatically: 1,
      only_include_allocated_payments: 0,
      write_off_amount: 0,
      base_write_off_amount: 0,
      write_off_outstanding_amount_automatically: 0,
      redeem_loyalty_points: 0,
      loyalty_points: 0,
      loyalty_amount: 0,
      ignore_default_payment_terms_template: 0,
      po_no: "",
      debit_to: "Debtors - PM",
      party_account_currency: "BDT",
      is_opening: "No",
      amount_eligible_for_commission: 0,
      commission_rate: 0,
      total_commission: 0,
      group_same_items: 0,
      language: "en",
      status: "Draft",
      // customer_group: "Gold (5% Discount)",
      is_internal_customer: 0,
      is_discounted: 0,
      doctype: "Sales Invoice",
      sales_team: [],
      // pricing_rules: [
      //   {
      //     docstatus: 0,
      //     idx: 1,
      //     pricing_rule: "PRLE-0002",
      //     item_code: "Propane Gas Bottle 20mm",
      //     rule_applied: 1,
      //     parentfield: "pricing_rules",
      //     parenttype: "Sales Invoice",
      //     doctype: "Pricing Rule Detail",
      //     __islocal: 1,
      //     parent: "new-sales-invoice-nfinkqizsv",
      //     name: "new-pricing-rule-detail-lstldvjhof",
      //   },
      // ],
      taxes: [],
      packed_items: [],
      advances: data.paid_amount == 0 ? [] : [
        {
          docstatus: 0,
          idx: 1,
          reference_type: "Payment Entry",
          reference_name: payment_name ,
          remarks: "Amount BDT ",
          // reference_row: "d7uflpq0pn",
          advance_amount: 0,
          // allocated_amount: data.total - 70,
          exchange_gain_loss: 0,
          ref_exchange_rate: 1,
          difference_posting_date: data.date_use,
          // parent: "new-sales-invoice-nfinkqizsv",
          parentfield: "advances",
          parenttype: "Sales Invoice",
          doctype: "Sales Invoice Advance",
          // __islocal: 1,
          // name: "new-sales-invoice-advance-gjofrjzsuv",
        },
      ],
      payment_schedule: [],
      items: data.items.map((_data) => ({
        ..._data,

        owner: "Administrator",
        docstatus: 0,
        idx: 1,
        has_item_scanned: 0,
        item_code: _data.item,
        item_name: _data.name,
        custom_capacity: 0,
        // description: "<div><p>20mm Valve | 12kg</p></div>",
        item_group: "Cylinder",
        image: _data.image,
        qty: _data.quantity,
        stock_uom: "PCS",
        uom: "PCS",
        conversion_factor: 1,
        stock_qty: 1,
        // price_list_rate: _data.price,
        // base_price_list_rate: _data.price,
        margin_rate_or_amount: 0,
        rate_with_margin: 0,
        discount_percentage: 0,
        discount_amount: 0,
        distributed_discount_amount: 0,
        base_rate_with_margin: 0,
        // rate: _data.price,
        // amount: _data.price,
        // base_rate: _data.price,
        // base_amount: _data.price,
        // pricing_rules: '[\n "PRLE-0002"\n]',
        stock_uom_rate: 0,
        is_free_item: 0,
        grant_commission: 1,
        // net_rate: _data.price,
        // net_amount: _data.price,
        // base_net_rate: _data.price,
        // base_net_amount: _data.price,
        delivered_by_supplier: 0,
        income_account: "Sales - PM",
        is_fixed_asset: 0,
        expense_account: "Cost of Goods Sold - PM",
        enable_deferred_revenue: 0,
        weight_per_unit: 0,
        total_weight: 0,
        warehouse: "Stores - PM",
        use_serial_batch_fields: 1,
        allow_zero_valuation_rate: 0,
        incoming_rate: 0,
        item_tax_rate: "{}",
        actual_batch_qty: 0,
        actual_qty: 0,
        company_total_stock: 0,
        sales_order: sales_order,
        // so_detail: "cfhevqoj0t",
        delivered_qty: 0,
        cost_center: "Main - PM",
        page_break: 0,
        parentfield: "items",
        parenttype: "Sales Invoice",
        doctype: "Sales Invoice Item",
        __islocal: 1,
        __unsaved: 1,
        // parent: "new-sales-invoice-nfinkqizsv",
        // name: "new-sales-invoice-item-vdsetxzvoc",
      })),
      timesheets: [],
      payments: [],
      // __islocal: 1,
      // __onload: {
      //   load_after_mapping: true,
      // },
      __unsaved: 1,
      // name: "new-sales-invoice-nfinkqizsv",
      company_address: "",
      company_address_display: "",
    };
    const option = { doc: JSON.stringify(thisdata), action: "Save" };

    dispatch(postOrder(option)).then(function (e) {
      // console.log("==invoice save====", JSON.stringify(e.payload.docs[0].name));
      if (e.payload.docs[0].name) {
        const name = e.payload.docs[0].name;
        const tail = "/" + name;
        const data = {
          docstatus: 1,
        };
        const _option = [tail, data];
        // console.log("===is-===" + _option);

        dispatch(submitInvoice(_option)).then(function (e) {
          // console.log("===submit invoice===",JSON.stringify(e.payload.data.name));
          e.payload.data.name
            ? makeTheCall()
            : console.log("Something went wrong with sales order submit");
        });
      } else console.log("Something went wrong with sales order save");
    });
  };

  const makeTheCall = () => {
    setIsLoading(false);
    setIsComplete(true);
  };

  const goHome = () => {
    router.push("/(drawer)/(tabs)/home");
  };
  return !isComplete ? (
    <>
      <ScrollView style={styles.container}>
        {data?.page_status == 1 && (
          <Card style={styles.body} variant="elevated">
            <View style={styles.header}>
              <View style={styles.headerColumn}>
                <Text size="lg" style={styles.letter}>
                  Order ID
                </Text>
                <Text size="xl" style={styles.letter} bold>
                  {data.order}
                </Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard(data.order)}>
                <Fontisto name="copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </Card>
        )}

        <Card style={styles.body} variant="elevated">
          <View style={styles.headerColumn2}>
            <Text size="lg" style={[styles.letterHead, styles.letter]} bold>
              Timeline
            </Text>
            <View style={styles.dateBody}>
              <Text size="md" style={styles.letter}>
                Submission Date : {data.date}
              </Text>

              {data?.page_status == 1 && (
                <Text size="md" style={styles.letter} bold>
                  Last Update : {data.date}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.myGap}></View>
          <View>
            <View>
              <Text size="lg" style={styles.letter} bold>
                Product Details
              </Text>
              {data.items?.map((data, index) => (
                <View style={styles.dataTable} key={index}>
                  <Text
                    size="sm"
                    style={{
                      // backgroundColor : 'red',
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="dot-single" size={15} color="green" />{" "}
                    {/* {data.name} | {data.capacity} */}
                    {data.capacity}
                  </Text>
                  <Text size="sm">(QTY){data.qty || data.quantity}</Text>
                  <Text size="sm">{data.price} Tk</Text>
                </View>
              ))}
            </View>
            <View style={styles.myGap}>
              <Divider className="my-0.5" />
            </View>
            <View style={styles.subTotal}>
              <Text>Total</Text>
              <Text>{data.subtotal}</Text>
            </View>
            {/* <View style={styles.subTotal}>
              <Text> Tax</Text>
              <Text>{data.tax}</Text>
            </View> */}
            {data.page_status == 0 && (
              <View style={styles.subTotal}>
                <Text size="md" bold>
                  {" "}
                  Paid
                </Text>
                <Text bold>{data.paid_amount}</Text>
              </View>
            )}

            <View style={styles.subTotal}>
              <Text> status</Text>
              <Text
                style={{
                  marginVertical: 5,
                }}
              >
                <BadgeSymbol text={data.status} />
              </Text>
            </View>
          </View>
        </Card>
        <Card style={styles.body} variant="elevated">
          <View>
            <Text size="sm" style={[styles.letter, styles.shipping]} bold>
              Shipping Info
            </Text>
          </View>
          <View style={styles.dateBody}>
            <Text size="sm" style={styles.letter}>
              139,Road 10,Sector-4,Uttara ,Dhaka-1230
            </Text>
            <Text size="sm">Contact : 01765667656</Text>
          </View>
        </Card>
        {isLoading && <PSpinner />}
      </ScrollView>
      <Card
        style={{
          // backgroundColor: "#DF2B2A",
          backgroundColor: "#FF7276",
        }}
      >
        {data.page_status == 0 ? (
          <TouchableOpacity style={styles.footer} onPress={call_sales_order}>
            <Text size="lg" color="white">
              Submit
              {/* <AntDesign name="arrowright" size={12} color="red" /> */}
            </Text>
          </TouchableOpacity>
        ) : (data?.page_status == 1 && data?.status == "unpaid") ||
          data?.status == "partly paidd" ? (
          <TouchableOpacity style={styles.footer} onPress={makeCallPayment}>
            <Text size="lg" color="white">
              Payment
              <AntDesign name="arrowright" size={12} color="white" />
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footer}>
            <Text size="lg" color="white">
              Contact Support
              <AntDesign name="arrowright" size={12} color="white" />
            </Text>
          </View>
        )}
      </Card>
    </>
  ) : (
    <View style={styles.successContainer}>
      <AntDesign name="checkcircleo" size={55} color="green" />
      <Text size="lg"> Order Created Successfully </Text>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <ButtonBox
          action={"negative"}
          text="Go Home"
          fontColor="#fff"
          onClick={goHome}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  successContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  dateBody: {
    height: (height * 6) / 100,
    // backgroundColor : 'red',
    justifyContent: "space-between",
  },
  footer: {
    // backgroundColor : 'red',
    height: (height * 6) / 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    width: "100%",
  },
  letterHead: {
    marginVertical: (height * 1.5) / 100,
  },
  letter: {
    // letterSpacing: 0.5,
    fontSize: (height * 1.7) / 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerColumn2: {
    // height: (height * 10) / 100,
    flexDirection: "column",
    justifyContent: "space-between",
    // marginVertical : 10
  },
  myGap: {
    marginVertical: 10,
  },
  dataTable: {
    // backgroundColor : 'red',
    marginVertical: 10,
    // width: width,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subTotal: {
    marginStart: "50%",
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  shipping: {
    marginVertical: 10,
  },
});
