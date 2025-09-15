import {
  ScrollView,
  View,
  StyleSheet,
  DimensionValue,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BadgeSymbol from "../../component/badge/Badge";
import {
  Card,
  Text,
  Icon,
  ArrowRightIcon,
  Divider,
  Progress,
  ProgressFilledTrack,
  Badge,
} from "@gluestack-ui/themed";
import {
  setDataStore,
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
import { router } from "expo-router";
import ButtonBox from "../../component/button/Button";
import useConfig from "../../lib/hook/config";
import * as Clipboard from "expo-clipboard";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function OrderDetails() {
  const config = useConfig();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orderReducer.data);
  const image = useSelector((state) => state.cartReducer.image);
  // const warehouse = useSelector((state) => state.productReducer.warehouse);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  const makeCallPayment = () => {
    data.is_previous && dispatch(setDataStore(data));
    dispatch(storeTotal(data?.due?.toString() > 0 ? data?.due : data.total));
    router.push("screen/uploadScreen/UploadScreen");
  };


  const call_sales_order = () => {
    setIsLoading(true);
    const thisdata = {
      custom_delivery_point_2: data.warehouse,
      docstatus: 0,
      // name: "new-sales-order-item-jhugcvdhfs",
      doctype: "Sales Order",
      // __islocal: 1,
      // __unsaved: 1,
      // owner: "Administrator",
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
        // __islocal: 1,
        // __unsaved: 1,
        // owner: "Administrator",
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
        parentfield: "items",
        parenttype: "Sales Order",
        idx: 1,
        qty: _data.quantity,
        conversion_factor: 1,
        stock_qty: 1,
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
        item_name: _data.name,
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
        validate_applied_rule: 0,
        price_or_product_discount: "Price",
        pricing_rule_for: "Discount Percentage",
        has_pricing_rule: 1,
        delivery_date: data.date_use,//"2026-07-09",
      })),

      taxes: [],
      disable_rounded_total: 0,
      apply_discount_on: "Grand Total",
      packed_items: [],
      pricing_rules: [],
      payment_schedule: [],
      // status: "Draft",
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
      total_qty: 1,
      total_taxes_and_charges: 0,
      base_total_taxes_and_charges: 0,
      rounding_adjustment: 0,
      base_rounding_adjustment: 0,
      in_words: "",
      base_in_words: "",
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
      territory: null,
      language: "en",
      payment_terms_template: null,
      total_net_weight: 0,
    };
    const option = { doc: JSON.stringify(thisdata), action: "Save" };


    dispatch(postOrder(option)).then(function (e) {
      e?.payload?.docs[0]?.name
        ? _confirm(e.payload.docs[0].name)
        : // ("===sales order created===")
          console.log("Something went wrong with order save");
    });
  };

  const _confirm = (name) => {
    const tail = "/" + name;
    const _data = {
      docstatus: 1,
    };
    const option = [tail, _data];

    dispatch(submitOrder(option)).then(function (e) {
      data.paid_amount == 0
        ? // salesInvoice(" ", e.payload.data.name)
          makeTheCall()
        : e.payload.data.name
        ? payment(e.payload.data.name)
        : (
           console.log("==sales order confirmed=="),
          alert("Something went wrong with order submit "))
    });
  };


  const payment = (reference_name) => {
    data.order && setIsLoading(true);
    // console.log("====payment called====", data);
    // console.log("bank"+data.bank.split(":")[0])
    const thisdata = {
      // bank
      bank: data.bank.split(":")[0],
      bank_account: data.bank.split(":")[1],
      paid_to: data.bank.split(":")[0] +" - PM",
      paid_to_account_type: "Bank",
      mode_of_payment: "Wire Transfer",
      custom_from_account: data.myaccount,

      reference_no: data.deposit,
      reference_date: data.date_use,
      // owner: "Administrator",
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
        // paid_to: "Cash - PM",
         // paid_to_account_type: "Cash",
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
      // status: "Draft",
      custom_remarks: 0,
      is_opening: "No",
      doctype: "Payment Entry",
      references: [
        {
          docstatus: 0,
          idx: 1,
          reference_doctype: "Sales Order",
          reference_name: reference_name.replace("#", ""),
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
      // __last_sync_on: "2025-07-09T11:27:15.065Z",
      // mode_of_payment: "Cash",
    };

    const option = { doc: JSON.stringify(thisdata), action: "Save" };

    dispatch(postOrder(option)).then(function (e) {
       console.log("post payment"+e.payload);
      if (e.payload.docs[0].name) {
        const name = e.payload.docs[0].name;
        // console.log(image);
        if (image) {
          let formData = new FormData();
          let match = /\.(\w+)$/.exec(image);
          let type = match ? `image/${match[1]}` : `image`;
          formData.append("file", {
            uri: image,
            name: e.payload.docs[0].name + "upload.jpg",
            type: type || "image/jpeg",
          });
          formData.append("is_private", "1");
          formData.append("folder", "Home");
          formData.append("doctype", "Payment Entry");
          formData.append("docname", e.payload.docs[0].name);

          dispatch(image_upload(formData)); // image upload

          // dispatch(image_upload(formData)).then(function (e) {
          //   //("image uploaded");
          // });
        }

        const tail = "/" + name;
        const data = {
          docstatus: 1,
        };
        const option = [tail, data];

        dispatch(submitPayment(option)).then(function (e) {
           ("===submit paymenty ===", e.payload.data.name);
          if (e.payload.data.name) {
            makeTheCall();
            // salesInvoice(e.payload.data.name, reference_name);
          } else alert("Something went wrong with payment submit");
        });
      } else alert("Something went wrong with payment save");
    });
  };

  const makeTheCall = () => {
    //  setIsLoading(false);
    incrementProgress();
    // setIsComplete(true);
  };

  const goHome = () => {
    router.push("/(drawer)/(tabs)/home");
  };
  const [progress, setProgress] = useState(0);

  const incrementProgress = () => {
    setInterval(() => {
      setProgress((prevProgress) => {
        const randomNumber = Math.floor(Math.random() * 20);
        const newvalue = prevProgress + randomNumber; // Increment by 10%
        return Math.min(newvalue, 100); // Ensure it doesn't exceed 100%
        // return i
      });
      // }
    }, 500);
    // setIsLoading(false);
  };

  useEffect(() => {
    progress === 100 && (setIsLoading(false), setIsComplete(true));
  }, [progress]);

  return !isComplete ? (
    <>
      <ScrollView style={styles.container}>
        {data?.order && (
          <Card style={styles.body} variant="elevated">
            <View style={styles.header}>
              <View style={styles.headerColumn}>
                <Text size="lg" style={styles.letter}>
                  Order ID
                </Text>
                <View style={{
                  width : '100%',
                  display : 'flex',
                  flexDirection : 'row',
                  justifyContent : 'space-between'
                }}>
                <Text size="xl" style={styles.letter} bold>
                  {data.order}
                </Text>
                <TouchableOpacity onPress={() => copyToClipboard(data.order)} style={{
                // backgroundColor : 'red',
                display  :'flex',
                justifyContent : 'center',
                alignItems : 'center',
                // height : 50
              }}>
                <Fontisto name="copy" size={24} color="black" />
              </TouchableOpacity>
                </View>
               
              </View>
              {/* <TouchableOpacity onPress={() => copyToClipboard(data.order)} style={{
                // backgroundColor : 'red',
                display  :'flex',
                justifyContent : 'center',
                alignItems : 'center',
                // height : 50
              }}>
                <Fontisto name="copy" size={24} color="black" />
              </TouchableOpacity> */}
              
            </View>
            <View style={{
              display : 'flex',
              flexDirection : 'row',
              justifyContent : 'space-between',
              marginVertical : 10
            }}>
              <BadgeSymbol 
              action={"success"}
              text={data.petromax_status || "Order Created"}  />
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
              
             {/*  */}
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
            <View
              style={{
                alignItems: "center",
              }}
            ></View>
            {data.page_status == 0 && (
              <View style={styles.subTotal}>
                <Text size="md" bold>
                  {data.order ? "Payment" : "Paid"}
                </Text>
                <Text bold>{data.paid_amount}</Text>
              </View>
            )}
          </View>
        </Card>
        {isLoading && (
          <Card>
            <Progress
              value={progress}
              size="2xl"
              orientation="horizontal"
              style={{
                borderRadius: 3,
                backgroundColor: "#eec0c8",
              }}
            >
              <ProgressFilledTrack
                style={{
                  borderRadius: 3,
                  backgroundColor: "#98FB98",
                }}
              />
            </Progress>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text size="md">{progress + "%"}</Text>
            </View>
          </Card>
        )}

        {data.order && (
          <Card style={styles.body} variant="elevated">
            <View>
              <Text size="sm" style={[styles.letter, styles.shipping]} bold>
                Payment History
              </Text>
            </View>

            {data.payment_Entry?.map((data, index) => (
              <View style={styles.dataTable} key={index}>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    size="sm"
                    color="green"
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="dot-single"
                      size={(height * 2) / 100}
                      color="green"
                    />{" "}
                    {data.date}
                  </Text>
                  <Text
                    size="xs"
                    style={{
                      marginHorizontal: 20,
                    }}
                    color="red"
                  >
                    {data.dep_slp}
                  </Text>
                </View>
                <Text size="sm" color="green">
                  {data.amount} Tk
                </Text>
              </View>
            ))}
          </Card>
        )}

        <Card style={styles.body} variant="elevated">
          <View>
            <Text size="sm" style={[styles.letter, styles.shipping]} bold>
              Shipping Point
            </Text>
          </View>
          <View style={styles.dateBody}>
            <Text size="sm" style={styles.letter}>
              {data.warehouse || data.delivery_point}
            </Text>
            {/* <Text size="sm">Contact : 01765667656</Text> */}
          </View>
        </Card>
      </ScrollView>
      {/* {isLoading && (
          <Card> 
             <Progress value={progress} size="2xl" orientation="horizontal" style={{
              borderRadius : 3,
              backgroundColor : '#FFDCD1'
             }}>
              <ProgressFilledTrack  style={{
                borderRadius : 3,
                backgroundColor : '#DF2B2A'
              }}/>
            </Progress> 
            <View style={{
              alignItems : 'center'
            }}>
              <Text size="md">{progress + '%'}</Text>
            </View> 
          </Card>
        )} */}

      <Card
        style={{
          // backgroundColor: "#DF2B2A",
          backgroundColor: "#FF7276",
        }}
      >
        {!data.is_previous ? (
          <TouchableOpacity
            style={styles.footer}
            onPress={data?.order ? () => payment(data.order) : call_sales_order}
            // disabled={isLoading}
          >
            <Text size="lg" color="white">
              Submit
              {/* <AntDesign name="arrowright" size={12} color="red" /> */}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.footer}
            onPress={
              // incrementProgress
              makeCallPayment
            }
          >
            <Text size="lg" color="white">
              Payment
              <AntDesign name="arrowright" size={12} color="white" />
            </Text>
          </TouchableOpacity>
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
