import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { IPurchaseOrderItem } from '@dto/i-purchase-order-item.dto';
import { styles } from './PurchaseOrderTemplate.style';
import { convertToLocalString } from '@utils/date-time/date-time-format';

interface IPurchaseOrderTemplateProps {
  purchaseOrderDate: string;
  purchaseOrderNumber: string;
  purchaseOrderVendorName: string;
  purchaseOrderVendorAddressLine1: string;
  purchaseOrderVendorAddressLine2: string;
  purchaseOrderItems?: IPurchaseOrderItem[];
}

const PurchaseOrderTemplate: React.FC<IPurchaseOrderTemplateProps> = (props) => {
  const { purchaseOrderDate, purchaseOrderNumber, purchaseOrderVendorName, purchaseOrderVendorAddressLine1, purchaseOrderVendorAddressLine2, purchaseOrderItems } = props;

  return (
    <Document>
      <View
        style={{
          position: 'absolute',
          left: '50%',
          marginLeft: '-297px',
          top: '0px',
          width: '595px',
          height: '842px',
          borderStyle: 'solid',
          overflow: 'hidden',
        }}
      >
        <Page size="A4">
          <View style={{ left: '0px', top: '0px' }}>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '28.14px',
                ...styles.cls_002,
              }}
            >
              <Text style={styles.cls_002}>Engseen Bleaching &#38; Dyeing Sdn Bhd</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '367.68px',
                top: '31.26px',
                ...styles.cls_002,
              }}
            >
              <Text style={styles.cls_002}>P U R C H A S E O R D E R</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '49.98px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Lot 2958, Acku Inds. Estate</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '61.26px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Jalan Bagan Lalang</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '414.01px',
                top: '61.26px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>DATE:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '474.00px',
                top: '61.26px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>{purchaseOrderDate}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '73.26px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>13400 Butterworth</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '414.00px',
                top: '73.26px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>PO:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '474.00px',
                top: '73.26px',
                ...styles.cls_004,
              }}
            >
              <Text style={styles.cls_004}>{purchaseOrderNumber}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '84.60px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Penang Malaysia</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '414.00px',
                top: '84.60px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>PO Rev:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '95.88px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Phone:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '60.00px',
                top: '95.88px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>04-4844208</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '414.00px',
                top: '95.88px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Your Ref:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '414.00px',
                top: '107.46px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Page:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '474.00px',
                top: '107.46px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>1</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '17.01px',
                top: '142.38px',
                ...styles.darkBackground,
              }}
            >
              <View style={{ paddingLeft: '6px', ...styles.cls_005 }}>
                <Text style={styles.cls_005}>VENDOR</Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '335.01px',
                top: '142.38px',
                ...styles.darkBackground,
              }}
            >
              <View style={{ paddingLeft: '6px', ...styles.cls_005 }}>
                <Text style={styles.cls_005}>SHIP TO / PLACE OF DELIVERY</Text>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '153.96px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>{purchaseOrderVendorName}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '341.99px',
                top: '153.96px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Engseen Bleaching &#38; Dyeing Sdn Bhd</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '165.30px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>{purchaseOrderVendorAddressLine1}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '342.00px',
                top: '165.30px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Lot 2958, Acku Inds. Estate</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '176.58px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>{purchaseOrderVendorAddressLine2}</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '341.99px',
                top: '176.58px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Jalan Bagan Lalang</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '342.00px',
                top: '187.86px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>13400 Butterworth</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '342.00px',
                top: '199.20px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Penang Malaysia</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '210.48px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Phone:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '60.00px',
                top: '210.48px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>04-4844208</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '21.00px',
                top: '256.86px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>SHIP VIA:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '342.00px',
                top: '256.86px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>TERMS OF PAYMENT:Net 60 days</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '21.00px',
                top: '268.20px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>FOB:</Text>
            </View>
            {/* TODO: Show Purchase Order Items here */}
            <View
              style={{
                position: 'absolute',
                left: '20.00px',
                top: '315.00px',
                ...styles.table,
              }}
            >
              <View style={{ ...styles.tableRow }}>
                <View
                  style={{
                    width: '30px',
                    ...styles.cell,
                    ...styles.textLeft,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Line</Text>
                </View>
                <View
                  style={{
                    width: '300px',
                    ...styles.cell,
                    ...styles.textLeft,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Item</Text>
                </View>
                <View
                  style={{
                    width: '65px',
                    ...styles.cell,
                    ...styles.textCenter,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Quantity</Text>
                </View>
                <View
                  style={{
                    width: '35px',
                    ...styles.cell,
                    ...styles.textCenter,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>UOM</Text>
                </View>
                <View
                  style={{
                    width: '80px',
                    ...styles.cell,
                    ...styles.textCenter,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Delivery Date</Text>
                </View>
                <View
                  style={{
                    width: '55px',
                    ...styles.cell,
                    ...styles.textCenter,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Unit Price</Text>
                </View>
                <View
                  style={{
                    width: '70px',
                    ...styles.cell,
                    ...styles.textRight,
                    ...styles.cls_004,
                  }}
                >
                  <Text style={styles.cls_004}>Total</Text>
                </View>
              </View>
              {purchaseOrderItems &&
                purchaseOrderItems.map((purchaseOrderItem: IPurchaseOrderItem, index) => {
                  return (
                    <View style={{ ...styles.tableRow }}>
                      <View
                        style={{
                          width: '30px',
                          ...styles.cell,
                          ...styles.textLeft,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>00{index + 1}</Text>
                      </View>
                      <View
                        style={{
                          width: '300px',
                          ...styles.cell,
                          ...styles.textLeft,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{purchaseOrderItem.componentName}</Text>
                      </View>
                      <View
                        style={{
                          width: '65px',
                          ...styles.cell,
                          ...styles.textCenter,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{purchaseOrderItem.quantity}</Text>
                      </View>
                      <View
                        style={{
                          width: '35px',
                          ...styles.cell,
                          ...styles.textCenter,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{purchaseOrderItem.uom ?? '-'}</Text>
                      </View>
                      <View
                        style={{
                          width: '80px',
                          ...styles.cell,
                          ...styles.textCenter,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{convertToLocalString(purchaseOrderItem.deliveryDate, true)}</Text>
                      </View>
                      <View
                        style={{
                          width: '55px',
                          ...styles.cell,
                          ...styles.textRight,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{purchaseOrderItem.itemCost}</Text>
                      </View>
                      <View
                        style={{
                          width: '70px',
                          ...styles.cell,
                          ...styles.textRight,
                          ...styles.cls_003,
                        }}
                      >
                        <Text style={styles.cls_003}>{purchaseOrderItem.quantity * purchaseOrderItem.itemCost}</Text>
                      </View>
                    </View>
                  );
                })}
            </View>

            <View
              style={{
                position: 'absolute',
                left: '442.80px',
                top: '685.14px',
                ...styles.cls_004,
              }}
            >
              <Text style={styles.cls_004}>Total (RM):</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '526.68px',
                top: '685.14px',
                ...styles.cls_004,
              }}
            >
              <Text style={styles.cls_004}>34,500.00</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '23.01px',
                top: '708.06px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>**This is a computer generated PO and does not require signature**</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '22.50px',
                top: '731.25px',
                ...styles.cls_006,
              }}
            >
              <Text style={styles.cls_006}>Terms and Conditions Apply (Kindly refer to the "General Purchase Terms and Conditions" sheet)</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '755.34px',
                ...styles.cls_007,
              }}
            >
              <Text style={styles.cls_007}>Acceptance of Order</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '777.66px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Name:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '789.00px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Designation:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '24.00px',
                top: '800.28px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Date:</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                left: '405.78px',
                top: '800.28px',
                ...styles.cls_003,
              }}
            >
              <Text style={styles.cls_003}>Authorized Signatory &#38; Company Stamp</Text>
            </View>
          </View>
        </Page>

        <Page size="A4">
          <View
            style={{
              position: 'absolute',
              left: '50%',
              marginLeft: '-297px',
              top: '852px',
              width: '595px',
              height: '842px',
              borderStyle: 'solid',
              overflow: 'hidden',
            }}
          >
            <View style={{ left: '0px', top: '0px' }}>
              <View
                style={{
                  position: 'absolute',
                  left: '215.82px',
                  top: '35.10px',
                  ...styles.cls_012,
                }}
              >
                <Text style={styles.cls_012}>GENERAL PURCHASE TERMS AND CONDITIONS (GPTC)</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '55.86px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 1. APPLICATION OF GENERAL PURCHASE TERMS AND CONDITIONS</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '55.86px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>have occurred after Engseen has tested and inspected the Goods and/or Works in accordance with this</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '61.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>1.1 The present GPTC shall apply to all Orders placed by Engseen Bleaching &#38; Dyeing Sdn. Bhd.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '61.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Clause.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '67.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>(“Engseen”) with a supplier (“Supplier”) for the purchase of goods (“Goods”) or engagement of services</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '67.32px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 10. WARRANTY</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '73.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>for the performance of the works (“Works”) specified in the Order. Consequently, the acceptance of any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '73.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>10.1 The Supplier guarantees in all circumstances, including in the case of authorised subcontracting,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '78.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Order by the Supplier entails the automatic acceptance of the present GPTC, which shall prevail over any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '78.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>that the Goods and/or Works delivered shall comply with the Specifications. In particular, it guarantees</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '84.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>other document provided by the Supplier whether in the form of the terms of the commercial offer,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '84.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>that the Goods and/or Works shall be free from defect in design, material and workmanship, that they</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '90.36px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>estimate, general terms of purchase or such other documents in whatever form.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '90.36px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>shall satisfactorily fulfil the performance requirements expected by Engseen and that they shall meet all</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '96.06px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 2. CONTRACT FORMATION</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '96.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>applicable laws and regulations.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '101.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>2.1 The Order (including the present GPTC), its written acceptance by the Supplier as well as any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '101.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>10.2 In the event of non-conformity of the Goods delivered or Works executed with the Specifications,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '107.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>document provided by Engseen pursuant to the Order (technical documents, projects, specifications,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '107.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Engseen reserves the right without prejudice to any potential claims for loss and damages, after sending</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '113.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>requirements etc.) shall constitute the contract. All Orders placed verbally, by e-mail or by phone shall</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '113.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>written notice and at any time, (i) to terminate all or part of the Order according to Clause 16 (return the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '119.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>only be valid after written acceptance by Engseen. Any commencement of performance of the Order by</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '119.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Goods at the Supplier’s sole costs and risks), (ii) accept such Goods and/or Works with an equitable</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '124.86px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Supplier entails the acceptance of all the conditions of the Order, including the present GPTC. Any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '124.86px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>reduction in price, (iii) to reject the non-conforming Goods and/or Works and require at the Supplier’s</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '130.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>amendment proposed by the Supplier to any element of the Order shall only be binding on Engseen upon</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '130.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>costs and risks, the delivery of replacement Goods or the re-performance of the Works or the making of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '136.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Engseen’s acceptance and agreement as evidenced in writing.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '136.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>necessary repairs to such Goods and/or Works as promptly as reasonably practicable.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '142.08px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 3. PRICES, TERMS OF PAYMENT AND INVOICING</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '142.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>10.3 The Supplier shall warrant that the Goods and/or Works executed pursuant to the performance of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '147.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>3.1 Unless otherwise agreed, all Order prices shall be fixed, firm and not subject to revision.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '147.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Works shall be free from defect within the period specified in the Order (“Warranty Period”). In the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '153.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>3.2 Unless otherwise specified in the Order, all Goods shall be delivered to Engseen’s designated</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '153.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>event of any defects found within the Warranty Period, Clause 11 shall apply.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '159.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>location with all customs, duties, taxes, freight charges, insurance and other costs and expenses relating</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '159.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>10.4 In the event of any part replaced or repaired during the Warranty Period suffers from recurrent</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '165.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>to the transportation and delivery of the Goods being paid by the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '165.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>defect, the Warranty Period for the Goods or the parts of the Works that suffer from such defect shall be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '170.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>3.3 The terms of payment are indicated in the Order. The payment of an invoice shall not constitute</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '170.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>deemed to start anew and commence from the day on which such Goods or Works are changed,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '176.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>acceptance of the Goods delivered or Works executed. If retention sum is applicable, Engseen shall be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '176.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>modified, remedied or replaced for and additional period equivalent to the Warranty Period.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '182.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>entitled to withhold or deduct any sum for payment to the Supplier in accordance with terms set out in the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '182.34px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 11. REMEDYING DEFECTS OR REPAIR AND REPLACEMENT</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '188.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Order for any such retention.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '188.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>11.1 In the event of a defect or failure or non-conformity with the Specifications in the Goods and/or</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '193.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>3.4 Invoicing shall be made in accordance with the arrangements set out in the Order. Any invoice issued</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '193.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Works (“Defects”) which becomes apparent within the Warranty Period, the Supplier shall, within forty</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '199.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>by the Supplier not stating the relevant Order number shall be deferred without additional expenses for</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '199.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>eight (48) hours after receipt of a written notice from Engseen, submit to Engseen a proposal for remedial</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '205.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '205.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>actions. Upon Engseen’s approval, the Supplier shall with due diligence, make good or correct the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '211.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>3.5 To secure the performance of the Supplier in the execution of the Works, Engseen may require the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '211.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Defects or replace the Goods, all at Supplier’s sole cost and expense within seven (7) days or such other</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '216.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier to provide a performance security at the amount to be specified in the Order from a third party</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '216.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>period agreed by Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '222.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>approved by Engseen according to the terms stated in the Order.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '222.60px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>11.2 The rejected Goods and/or non-conforming or defective Works shall be held entirety at the risk of the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '228.30px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 4. QUALITY AND SAFETY</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '228.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier and shall be removed by the Supplier at its own risk and expense. The Supplier shall reimburse</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '234.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.1 All Goods supplied shall:</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '234.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>and refund Engseen the whole or part of any payment made in respect of any rejected Goods and/or non-</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '239.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.1.1 be in accordance with the quantity, quality, description and other particulars contained in the Order</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '239.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>conforming Works or Defects which cannot be rectified or repaired by the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '245.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>and any sample, drawing, description and specification given to the Supplier by Engseen and all</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '245.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>11.3 All costs and charges incurred in remedying the Defects, including but not limited to any costs</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '251.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>applicable standards under the applicable law (“Specifications”);</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '251.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>relating to the repair, replacement, packing, handling, transportation and delivery of Goods and/or Works</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '257.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.1.2 be of satisfactory quality, fit for purpose or any intended use expressly or impliedly made known to</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '257.10px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>shall be fully borne by the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '262.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Supplier; and</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '262.80px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 12. INTELLECTUAL PROPERTY</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '268.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.1.3 free from defects in title, lien, encumbrances and claims.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '268.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>12.1 The Supplier represents and warrants that (i) any matter it furnishes for delivery of the Goods and/or</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '274.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.2 All Works performed shall:</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '274.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>execution of the Works does not infringe or violate any trademarks, patents, registered design, copyright,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '280.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.2.1 comply with the performance Specifications in the Contract and in accordance with the best industry</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '280.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>trademark or trade name or other legal rights of any third parties; and (ii) it has all necessary permits and</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '285.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>practice and all applicable standards, regulations and such other statutory requirements relating to the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '285.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>licences to allow it to sell the Goods and execute the Works to and for the Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '291.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Works to be executed.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '291.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>12.2 The Supplier shall fully indemnify and hold Engseen harmless against all actions or claims, liability,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '297.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.2.2 be executed in a proper and skillful manner by properly qualified and experienced personnel of the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '297.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>loss, costs, attorney’s fees, expenses and damages due to or arising from any infringement of intellectual</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '303.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier and in accordance with the best industry practice.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '303.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>property rights. The Supplier shall, at its own expense, defend Engseen against all such claims,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '308.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.3 The Goods and/or Works referred to in Sub-Clause 4.1 and Sub-Clause 4.2 shall include and apply to</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '308.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>proceedings and suits.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '314.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>any replacement, repaired, substituted or remedial Goods and/or Works provided by the Supplier</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '314.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>12.3 In case any item delivered by the Supplier under this GPTC is in any such suit held to constitute an</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '320.34px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>pursuant to Clause 11.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '320.33px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>infringement, and its use is enjoined, the Supplier shall at its option and expense:(i) procure for Engseen</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '326.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>4.4 In case of attendance at any Engseen’s premises or such other premises designated by Engseen, the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '326.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the right to continue using the item concerned; or(ii) replace or modify the item so that it becomes non-</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '331.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier shall be responsible for ensuring compliance with all provisions applying to the premises</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '331.79px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>infringing yet remains functionally and substantially equivalent.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '337.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>concerning hygiene, security and environment, both by itself and by its employees who are under its</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '337.55px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 13. BUYER’S DRAWINGS AND DOCUMENTS</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '343.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>responsibility. The Supplier shall not be entitled to claim for any compensation resulting therefrom. The</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '343.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>13.1 The ownership and intellectual property rights in all documents and software including but not limited</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '349.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier is required to obtain information as to the existence of such provisions before carrying out the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '349.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>to all drawings, blueprints, tracings and other items provided by Engseen to the Supplier or developed by</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '354.83px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Order. Works on Engseen’s premises or such other premises designated by Engseen shall be executed</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '354.84px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Supplier in the course of executing the Works based on Engseen’s Specifications (collectively,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '360.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>in compliance with applicable on-site rules and regulations and as part of instructions on security,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '360.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>“Documents”) shall be the sole property of the Engseen at all times. All Documents and any copies shall</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '366.29px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>administrative rules and general conditions of execution transmitted or given verbally before admission to</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '366.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>be delivered to Engseen upon the delivery of the Goods and/or completion of the Works regardless of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '372.05px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>site.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '372.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>whether payment has been made to the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '377.81px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 5. VARIATION</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '377.82px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 14. INSURANCE</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '383.57px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>5.1 Engseen may make any variation to the form, quality or quantity of the Goods and/or Works or any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '383.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>14.1 In addition to its legal liability, the Supplier remains automatically liable to Engseen as well as any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '389.27px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>schedule for the execution of the Works or any part thereof (“Variation”) but the effect, if any, of any such</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '389.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>third party for damages of any nature likely to be caused to them by the Supplier in the course of the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '395.03px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Variation shall be valued in accordance with schedule of rates where applicable and if not applicable,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '395.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>supply of the Goods and/or execution of the Works. These damages may be the direct and/or indirect</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '400.79px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>prices shall be reasonably agreed between the parties.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '400.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>consequences arising from the supply of the Goods and/or the execution of the Works. The Supplier also</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '406.55px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>5.2 Any instructions for Variation by Engseen (“Variation Order”) shall contain information as to the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '406.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>undertakes to fully indemnify Engseen for any recourse and/or any claim that third parties may bring</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '412.31px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>quantities and scope of Works and signed by Engseen’s authorised representatives. No Variation can be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '412.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>against Engseen within the context of the Order and to be responsible for all financial consequences,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '418.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>undertaken without a Variation Order.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '418.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>which may result from such recourse and/or claim.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '423.78px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 6. DELIVERY OF GOODS AND COMPLETION OF WORKS</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '423.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>14.2 The Supplier shall procure all necessary insurance to cover for all the liabilities it incurs or may incur</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '429.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.1 The Supplier commits to inspect the Goods, before delivery, for compliance with the Specifications</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '429.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>pursuant to the Order and as described in the foregoing Sub-Clause 14.1. The Supplier undertakes to</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '435.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>and to properly pack them so that they shall not be damaged during transportation. The Supplier is</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '435.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>provide Engseen, without delay, with all certificates for the insurance covers it has procured in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '441.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>obliged to comply with all contractual lead-times provided and set out under the Order (“Delivery Date”).</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '441.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>accordance with this Clause and with the requirements of Engseen. These obligations do not release the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '446.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Engseen shall be entitled to terminate the Order if it is not executed within the contractual lead-times or</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '446.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Supplier in any event from its liability. In particular, the Supplier remains liable for the damages for its</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '452.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>after the extended lead-times set out by Engseen. Engseen reserves the right to refuse partial or early</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '452.58px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>account where the financial consequences may not be covered, totally or in part, by its insurance.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '458.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>deliveries and may return the Goods at the Supplier’s costs and risks.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '458.28px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 15. CONFIDENTIALITY AND PUBLICITY</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '464.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.2 The Supplier shall commence the Works on the date specified in the Order and shall complete within</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '464.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>15.1 The Supplier shall keep and cause to keep in confidence, all data it may receive at the time pursuant</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '469.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the period specified in the Order or the Works schedule agreed in writing by Engseen (“Completion</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '469.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>to the Order. The Supplier agrees to refrain from disclosing any such data to third parties and/or using</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '475.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Date”).</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '475.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>them in any form whatsoever, for purposes other than carrying out the Order without the prior written</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '481.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.3 Time is of the essence in the Supplier’s delivery of Goods and/or completion of Works under this</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '481.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>consent of Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '487.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Contract. The Supplier will promptly notify Engseen if the Delivery Date and/or Completion Date cannot</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '487.08px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>15.2 The Supplier shall not carry out any advertising or publicity in respect of the Order without the prior</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '492.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>be met or is likely to be delayed or disrupted together with supporting details (“Delay Notice”).</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '492.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>written approval of Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '498.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.4 On receipt of the Delay Notice, Engseen shall be entitled but is under no obligation to extend the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '498.54px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 16. TERMINATION</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '504.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Delivery Date and/or Completion Date as appropriate which shall not constitute Engseen’s waiver of any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '504.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.1 If the Supplier fails to perform or partially perform any of its obligations in respect of an Order,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '510.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>of the Supplier’s obligations or prejudice any of Engseen’s rights under the Contract.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '510.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>including in the event the Supplier‘s financial condition may reasonably be construed as preventing the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '515.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.5 If the Supplier fails to deliver the Goods on Delivery Date and/or complete the Works on Completion</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '515.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>proper performance of the Order and the Supplier fails to remedy any such performance within the period</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '521.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Date, the Supplier shall be liable to pay the amount specified in the Order as liquidated damages for each</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '521.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>prescribed in the formal letter of demand issued by Engseen to the Supplier notifying the Supplier of its</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '527.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>day for which the Supplier fails to deliver the Goods and/ or complete the Works by the Delivery Date</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '527.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>default, such Order may be terminated in whole or part by Engseen by giving the Supplier a fifteen (15)</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '533.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>and/or Completion Date, as applicable. Notwithstanding the aforementioned, the Supplier shall also be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '533.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>days prior notice and such termination shall take effect upon expiry of such fifteen (15) days. Any</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '538.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>liable for all actual and reasonable costs and damages which Engseen incurs as a result of the late</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '538.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>termination shall be without prejudice to any liquidated damages and to any damages that could be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '544.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>delivery of the Goods and/or late completion of the Works.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '544.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>claimed by Engseen from the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '550.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>6.6 Engseen may at any time instruct the Supplier to suspend the delivery of the Goods and/or execution</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '550.32px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.2 Any breach of the confidentiality obligations provided in Clause 15 by the Supplier may automatically</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '556.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>of the Works or any part thereof, provided that Engseen has reasonable cause to do so and Engseen in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '556.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>give rise to the termination of the Order, at the demand of Engseen, without prejudice to any potential</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '561.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>so doing, shall act in good faith. The Supplier shall not be entitled to be paid any additional cost during</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '561.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>claims for loss and damages by Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '567.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the suspension period, unless otherwise agreed by the Parties.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '567.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.3 Engseen shall be entitled to charge to the Supplier any positive cost differential between the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '573.30px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 7. TRANSFER OF TITLE AND RISK</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '573.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>replacement Goods which Engseen is required to acquire from other suppliers and/or the appointment of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '579.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>7.1 The transfer of title to the Goods takes place after delivery at the place specified in the Order. Unless</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '579.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>a new contractor to execute the uncompleted Works due to the termination of the Order and the prices of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '584.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>expressly accepted by Engseen, any title retention clause shall be deemed invalid. If the Goods must be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '584.82px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Goods and/or Works as stated in the Order.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '590.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>manufactured or performed over a certain period of time, the transfer of title to Engseen shall take place</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '590.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.4 Engseen shall be entitled to terminate the Order or part thereof at its convenience provided always</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '596.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>gradually according to the progression of the manufacturing operations or performance, with the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '596.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>that the Supplier shall be paid the amounts payable for any Goods delivered and accepted by the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '602.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>exception of risks that shall remain the responsibility of the Supplier according to the provisions</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '602.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Engseen and/or Works executed up to the date of termination of the Order and all reasonable costs which</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '607.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>hereunder.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '607.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>have been committed by the Supplier in anticipation of the full delivery of the Goods and/ or the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '613.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>7.2 If the Goods or any part thereof are nonconforming, the Supplier shall continue to bear the risk of loss</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '613.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>completion of the Works. Upon the termination of the Order pursuant to this Sub-Clause, the Supplier</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '619.26px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>as to them until the cure of the defect or acceptance by Engseen, whichever is earlier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '619.26px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>shall immediately cease the performance of the whole or part of the work in progress and take all</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '625.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>7.3 Title to any Goods that are rejected on receipt or retention of which is refused by Engseen, or</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '625.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>reasonable steps to minimize the incurrence of costs allocable to the work and the Engseen’s sole liability</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '630.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>acceptance of which is justifiably revoked, shall re-vest in the Supplier, whereupon the Supplier shall bear</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '630.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>is to pay the Supplier the amounts payable for any Goods delivered and accepted by the Engseen and/or</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '636.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>all responsibility for the Goods and liability under all applicable environmental laws, including liability for</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '636.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Works up to the date of termination of the Contract.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '642.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>disposal thereof, against which the Supplier shall indemnify Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '642.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.5 The termination of the Order shall be without prejudice to the rights and remedies of the parties</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '648.06px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 8. INSPECTION AND TESTING</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '648.05px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>which have accrued prior to the termination of the Order.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '653.76px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>8.1 The Buyer reserves the right to inspect and test the Goods and/or the Works at any stage at the site</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '653.76px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>16.6 Relevant obligations of the parties set out in clauses of this GPTC relating to confidentiality,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '659.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>at which the Works are to be executed (“Site”) and/or the Supplier’s premises and the Supplier shall give</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '659.51px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>ownership, intellectual property rights, indemnities and any rights arising on termination shall survive the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '665.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>rights of access to premises and such facilities as Engseen may reasonably require for such inspection at</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '665.27px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>termination.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '671.04px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the Supplier’s cost and expense.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '671.03px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 17. SUB-CONTRACTING</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '676.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>8.2 The Supplier shall comply strictly and fully with the test requirements as stipulated by Engseen in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '676.79px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>17.1 Any subcontracting of the whole or a part of the Order must have received the prior written</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '682.56px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>accordance with the Specifications, drawings, instructions or standards supplied or agreed by Engseen,</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '682.55px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>agreement of Engseen. In any event, the Supplier remains solely liable for the performance of the Order</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '688.26px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>as specified in the Order and required under the law and shall furnish the test results to Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '688.25px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>and guarantees that its subcontractor(s) shall conform to the terms hereof. The Supplier in particular</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '694.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>8.3 Passing of inspection and testing or acceptance of inspection and testing results in respect of the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '694.01px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>undertakes to ensure that its subcontractors adhere to the present GPTC.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '699.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Goods and/or Works will not constitute Engseen’s waiver of any of the Supplier’s obligations or prejudice</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '699.78px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 18. ASSIGNMENT</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '705.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>any of Engseen’s rights under the Contract.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '705.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>18.1 The Order is neither assignable nor transferable by the Supplier, whether in whole or in part, without</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '711.30px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 9. ACCEPTANCE OR TAKING-OVER</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '711.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the prior written and express approval of Engseen. The Supplier shall inform Engseen without delay of</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '717.05px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>9.1 The receipt of Goods shall be made according to the applicable Site rules. Engseen shall not be</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '717.06px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>any important change to its legal structure or any change of control of its capital. In such cases, Engseen</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '722.76px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>deemed to have accepted any Goods until it has had reasonable time to verify if they conform to the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '722.76px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>may terminate the Order as of right without any compensation to the Supplier if Engseen is of the</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '728.51px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>Specifications set out in the Order. The release given at the time of receipt as evidenced by the delivery</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '728.52px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>reasonable view that any such change shall adversely affect the proper performance of the Supplier in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '734.27px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>note signed by Engseen shall not be deemed as discharging the Supplier where later inspection reveal</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '734.28px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>respect of the Order.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '740.03px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>that the Goods delivered do not conform to the Order’s Specifications.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '740.04px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 19. STAMP DUTY</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '745.79px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>9.2 Engseen shall notify the Supplier when he considers that the Supplier has completed the Works in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '745.80px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>19.1 The stamp duty payable for the sale of the Goods and/or execution of the Works pursuant to or in</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '751.49px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>accordance with this Contract stating the date accordingly (“Taking-Over Notice”).</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '751.50px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>relation to this Order shall be borne by the Supplier.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '757.25px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>9.3 Upon issuance of the Taking-Over Notice, Engseen shall take over the Works and subject to Clause</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '757.26px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 20. ENTIRE AGREEMENT</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '763.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>11, the Supplier shall promptly complete any outstanding work, remove from the site at which the Works</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '763.02px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>20.1 This Contract constitutes the entire agreement between Engseen and the Employer with respect to</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '768.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>are to be performed any and all their equipment, materials, employees, wreckage, rubbish or temporary</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '768.78px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the subject matter of this Contract and supersedes all communications, negotiations and agreements</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '774.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>works no longer required and shall make the Works ready for use and in a good working condition within</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '774.54px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>whether made in writing or orally of both parties made prior to the date of this Contract</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '780.30px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>the period specified by Engseen.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '780.30px',
                  ...styles.cls_009,
                }}
              >
                <Text style={styles.cls_009}>CLAUSE 21. GOVERNING LAW</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '786.00px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>9.4 Any payment made in respect of Goods and/or Works provided by the Supplier prior to the inspection</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '325.98px',
                  top: '786.00px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>21.1 The Order shall be exclusively governed and construed in accordance with the laws of Malaysia.</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: '56.70px',
                  top: '791.76px',
                  ...styles.cls_010,
                }}
              >
                <Text style={styles.cls_010}>by Engseen shall not constitute acceptance of the Goods and/or Works. Acceptance shall be deemed to</Text>
              </View>
            </View>
          </View>
        </Page>
      </View>
    </Document>
  );
};

export default PurchaseOrderTemplate;
