import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import receiptBackground from "../assets/slip.jpg";

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
    color: "#006400",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#2d3748",
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
    color: "#4a5568",
  },
  list: {
    marginLeft: 10,
    marginBottom: 6,
  },
  token: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
    color: "#4a5568",
  },
});

const ReceiptPDF = ({ paymentDetails, tokenNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={receiptBackground} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.text}>Your order has been confirmed with the following details:</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Payment Info</Text>
          <Text style={styles.text}>Card Type: {paymentDetails.paymentInfo.cardType}</Text>
          <Text style={styles.text}>Card Name: {paymentDetails.paymentInfo.cardName}</Text>
          <Text style={styles.text}>Card Number: **** **** **** {paymentDetails.paymentInfo.cardNumber.slice(-4)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Order Summary</Text>
          <Text style={styles.text}>Total Price: INR {paymentDetails.totalPrice.toFixed(2)}</Text>
          <Text style={styles.heading}>Items:</Text>
          <View style={styles.list}>
            {paymentDetails.cartItems.map((item, index) => (
              <Text key={index} style={styles.text}>
                {item.foodName} x {item.quantity}
              </Text>
            ))}
          </View>
        </View>

        <Text style={styles.token}>Token Number: {tokenNumber}</Text>
        <Text style={styles.footer}>Thank you for your order!</Text>
      </View>
    </Page>
  </Document>
);

const PaymentReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentDetails, tokenNumber } = location.state || {}; // Safe access to location.state

  // If paymentDetails or tokenNumber is missing, redirect to an error or another page
  if (!paymentDetails || !tokenNumber) {
    // Redirect user to the home or cart page with an error message
    navigate("/cart", { replace: true });
    return null; // Prevent further rendering
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-200">
      <h1 className="mb-4 text-2xl font-bold">Payment Receipt</h1>
      <p className="mb-2">Thank you for your purchase! Here are your order details:</p>
      <p className="mb-2">Token Number: {tokenNumber}</p>
      <PDFDownloadLink
        document={<ReceiptPDF paymentDetails={paymentDetails} tokenNumber={tokenNumber} />}
        fileName="receipt.pdf"
      >
        {({ loading }) =>
          loading ? (
            <button className="button-3d">
              Loading Receipt...
            </button>
          ) : (
            <button className="button-3d">
              Download Receipt
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PaymentReceipt;
