import React from "react";
import "./PurchaseOrderTemplate.css";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const PurchaseOrderTemplate = () => {

  return (
    <>
      <div style={{ position: "absolute", left: "50%", marginLeft: "-297px", top: "0px", width: "595px", height: "842px", borderStyle: "outset", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "0px", top: "0px" }}>
          <img src="6458e688-4acd-11ec-a980-0cc47a792c0a_id_6458e688-4acd-11ec-a980-0cc47a792c0a_files/background1.jpg" width="595" height="842" />
          <div style={{ position:"absolute", left: "367.68px", top: "31.26px" }} className="cls_002">
            <span className="cls_002">P U R C H A S E   O R D E R</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "49.98px" }} className="cls_003">
            <span className="cls_003">Lot 2958, Acku Inds. Estate</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top:"61.26px" }} className="cls_003">
            <span className="cls_003">Jalan Bagan Lalang</span>
          </div>
          <div style={{ position: "absolute", left: "414.01px", top: "61.26px" }} className="cls_003">
            <span className="cls_003">DATE:</span>
          </div>
          <div style={{ position: "absolute", left: "474.00px", top: "61.26px" }} className="cls_003">
            <span className="cls_003">06/05/2019</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "73.26px" }} className="cls_003">
            <span className="cls_003">13400 Butterworth</span>
          </div>
          <div style={{ position: "absolute", left: "414.00px", top: "73.26px" }} className="cls_003">
            <span className="cls_003">PO:</span>
          </div>
          <div style={{ position: "absolute", left: "474.00px", top: "73.26px" }} className="cls_004">
            <span className="cls_004">PO-010703</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "84.60px" }} className="cls_003">
            <span className="cls_003">Penang Malaysia</span>
          </div>
          <div style={{ position: "absolute", left: "414.00px", top: "84.60px" }} className="cls_003">
            <span className="cls_003">PO Rev:</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "95.88px" }} className="cls_003">
            <span className="cls_003">Phone:</span>
          </div>
          <div style={{ position: "absolute", left: "60.00px", top: "95.88px" }} className="cls_003">
            <span className="cls_003">04-4844208</span>
          </div>
          <div style={{ position: "absolute", left: "414.00px", top: "95.88px" }} className="cls_003">
            <span className="cls_003">Your Ref:</span>
          </div>
          <div style={{ position: "absolute", left: "414.00px", top: "107.46px" }} className="cls_003">
            <span className="cls_003">Page:</span>
          </div>
          <div style={{ position: "absolute", left: "474.00px", top: "107.46px" }} className="cls_003">
            <span className="cls_003">1</span>
          </div>
          <div style={{ position: "absolute", left: "23.01px", top: "142.38px" }} className="cls_005">
            <span className="cls_005">VENDOR</span>
          </div>
          <div style={{ position: "absolute", left: "341.01px", top: "142.38px" }} className="cls_005">
            <span className="cls_005">SHIP TO / PLACE OF DELIVERY</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "153.96px" }} className="cls_003">
            <span className="cls_003">BLP  CHEMICAL SDN.BHD.</span>
          </div>
          <div style={{ position: "absolute", left: "341.99px", top: "153.96px" }} className="cls_003">
            <span className="cls_003">Engseen Bleaching & Dyeing Sdn Bhd</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "165.30px" }} className="cls_003">
            <span className="cls_003">5,JALAN  DESA  SENTOSA  1, TAMAN  DESA  SENT</span>
          </div>
          <div style={{ position: "absolute", left: "342.00px", top: "165.30px" }} className="cls_003">
            <span className="cls_003">Lot 2958, Acku Inds. Estate</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "176.58px" }} className="cls_003">
            <span className="cls_003">09600 LUNAS</span>
          </div>
          <div style={{ position: "absolute", left: "341.99px", top: "176.58px" }} className="cls_003">
            <span className="cls_003">Jalan Bagan Lalang</span>
          </div>
          <div style={{ position: "absolute", left: "342.00px", top: "187.86px" }} className="cls_003">
            <span className="cls_003">13400 Butterworth</span>
          </div>
          <div style={{ position: "absolute", left: "342.00px", top: "199.20px" }} className="cls_003">
            <span className="cls_003">Penang Malaysia</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "210.48px" }} className="cls_003">
            <span className="cls_003">Phone:</span>
          </div>
          <div style={{ position: "absolute", left: "60.00px", top: "210.48px" }} className="cls_003">
            <span className="cls_003">04-4844208</span>
          </div>
          <div style={{ position: "absolute", left: "21.00px", top: "256.86px" }} className="cls_003">
            <span className="cls_003">SHIP VIA:</span>
          </div>
          <div style={{ position: "absolute", left: "342.00px", top: "256.86px" }} className="cls_003">
            <span className="cls_003">TERMS OF PAYMENT:Net 60 days</span>
          </div>
          <div style={{ position: "absolute", left: "21.00px", top: "268.20px" }} className="cls_003">
            <span className="cls_003">FOB:</span>
          </div>
          <div style={{ position: "absolute", left: "23.28px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Line</span>
          </div>
          <div style={{ position: "absolute", left: "51.00px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Item</span>
          </div>
          <div style={{ position: "absolute", left: "300.48px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Quantity</span>
          </div>
          <div style={{ position: "absolute", left: "353.16px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">UOM</span>
          </div>
          <div style={{ position: "absolute", left: "390.00px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Delivery Date</span>
          </div>
          <div style={{ position: "absolute", left: "463.32px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Unit Price</span>
          </div>
          <div style={{ position: "absolute", left: "544.14px", top: "314.64px" }} className="cls_004">
            <span className="cls_004">Total</span>
          </div>
          <div style={{ position: "absolute", left: "25.44px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">001</span>
          </div>
          <div style={{ position: "absolute", left: "51.00px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">DISPERSE  BLACK  ECO  300%</span>
          </div>
          <div style={{ position: "absolute", left: "303.72px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">1,000.00</span>
          </div>
          <div style={{ position: "absolute", left: "357.24px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">KG</span>
          </div>
          <div style={{ position: "absolute", left: "389.99px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">20/05/2019</span>
          </div>
          <div style={{ position: "absolute", left: "484.32px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">34.50</span>
          </div>
          <div style={{ position: "absolute", left: "526.68px", top: "326.04px" }} className="cls_003">
            <span className="cls_003">34,500.00</span>
          </div>
          <div style={{ position: "absolute", left: "442.80px", top: "685.14px" }} className="cls_004">
            <span className="cls_004">Total (RM):</span>
          </div>
          <div style={{ position: "absolute", left: "526.68px", top: "685.14px" }} className="cls_004">
            <span className="cls_004">34,500.00</span>
          </div>
          <div style={{ position: "absolute", left: "23.01px", top: "708.06px" }} className="cls_003">
            <span className="cls_003">**This is a computer generated PO and does not require signature**</span>
          </div>
          <div style={{ position: "absolute", left: "22.50px", top: "731.25px" }} className="cls_006">
            <span className="cls_006">Terms and Conditions Apply (Kindly refer to the "General Purchase Terms and Conditions" sheet)</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "755.34px" }} className="cls_007">
            <span className="cls_007">Acceptance of Order</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "777.66px" }} className="cls_003">
            <span className="cls_003">Name:</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "789.00px" }} className="cls_003">
            <span className="cls_003">Designation:</span>
          </div>
          <div style={{ position: "absolute", left: "24.00px", top: "800.28px" }} className="cls_003">
            <span className="cls_003">Date:</span>
          </div>
          <div style={{ position: "absolute", left: "405.78px", top: "800.28px" }} className="cls_003">
            <span className="cls_003">Authorized Signatory & Company Stamp</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: "50%", marginLeft: "-297px", top: "852px", width: "595px", height: "842px", borderStyle: "outset", overflow:"hidden" }}>
          <div style={{ position: "absolute", left: "0px", top: "0px" }}>
            <img src="6458e688-4acd-11ec-a980-0cc47a792c0a_id_6458e688-4acd-11ec-a980-0cc47a792c0a_files/background2.jpg" width="595" height="842" />
            <div style={{ position: "absolute", left: "215.82px", top: "35.10px" }} className="cls_012"><span className="cls_012">GENERAL PURCHASE TERMS AND CONDITIONS (GPTC)</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "55.86px" }} className="cls_009"><span className="cls_009">CLAUSE 1. APPLICATION OF GENERAL PURCHASE TERMS AND CONDITIONS</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "55.86px" }} className="cls_010"><span className="cls_010">have occurred after Engseen has tested and inspected the Goods and/or Works in accordance with this</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "61.56px" }} className="cls_010"><span className="cls_010">1.1 The present GPTC shall apply to all Orders placed by Engseen Bleaching & Dyeing Sdn. Bhd.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "61.56px" }} className="cls_010"><span className="cls_010">Clause.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "67.32px" }} className="cls_010"><span className="cls_010">(“Engseen”) with a supplier (“Supplier”) for the purchase of goods (“Goods”) or engagement of services</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "67.32px" }} className="cls_009"><span className="cls_009">CLAUSE 10. WARRANTY</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "73.08px" }} className="cls_010"><span className="cls_010">for the performance of the works (“Works”) specified in the Order. Consequently, the acceptance of any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "73.08px" }} className="cls_010"><span className="cls_010">10.1 The Supplier guarantees in all circumstances, including in the case of authorised subcontracting,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "78.84px" }} className="cls_010"><span className="cls_010">Order by the Supplier entails the automatic acceptance of the present GPTC, which shall prevail over any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "78.84px" }} className="cls_010"><span className="cls_010">that the Goods and/or Works delivered shall comply with the Specifications. In particular, it guarantees</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "84.60px" }} className="cls_010"><span className="cls_010">other document provided by the Supplier whether in the form of the terms of the commercial offer,</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "84.60px" }} className="cls_010"><span className="cls_010">that the Goods and/or Works shall be free from defect in design, material and workmanship, that they</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "90.36px" }} className="cls_010"><span className="cls_010">estimate, general terms of purchase or such other documents in whatever form.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "90.36px" }} className="cls_010"><span className="cls_010">shall satisfactorily fulfil the performance requirements expected by Engseen and that they shall meet all</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "96.06px" }} className="cls_009"><span className="cls_009">CLAUSE 2. CONTRACT FORMATION</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "96.06px" }} className="cls_010"><span className="cls_010">applicable laws and regulations.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "101.82px" }} className="cls_010"><span className="cls_010">2.1 The Order (including the present GPTC), its written acceptance by the Supplier as well as any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "101.82px" }} className="cls_010"><span className="cls_010">10.2 In the event of non-conformity of the Goods delivered or Works executed with the Specifications,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "107.58px" }} className="cls_010"><span className="cls_010">document provided by Engseen pursuant to the Order (technical documents, projects, specifications,</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "107.58px" }} className="cls_010"><span className="cls_010">Engseen reserves the right without prejudice to any potential claims for loss and damages, after sending</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "113.34px" }} className="cls_010"><span className="cls_010">requirements etc.) shall constitute the contract. All Orders placed verbally, by e-mail or by phone shall</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "113.34px" }} className="cls_010"><span className="cls_010">written notice and at any time, (i) to terminate all or part of the Order according to Clause 16 (return the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "119.10px" }} className="cls_010"><span className="cls_010">only be valid after written acceptance by Engseen. Any commencement of performance of the Order by</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "119.10px" }} className="cls_010"><span className="cls_010">Goods at the Supplier’s sole costs and risks), (ii) accept such Goods and/or Works with an equitable</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "124.86px" }} className="cls_010"><span className="cls_010">the Supplier entails the acceptance of all the conditions of the Order, including the present GPTC. Any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "124.86px" }} className="cls_010"><span className="cls_010">reduction in price, (iii) to reject the non-conforming Goods and/or Works and require at the Supplier’s</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "130.56px" }} className="cls_010"><span className="cls_010">amendment proposed by the Supplier to any element of the Order shall only be binding on Engseen upon</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "130.56px" }} className="cls_010"><span className="cls_010">costs and risks, the delivery of replacement Goods or the re-performance of the Works or the making of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "136.32px" }} className="cls_010"><span className="cls_010">Engseen’s acceptance and agreement as evidenced in writing.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "136.32px" }} className="cls_010"><span className="cls_010">necessary repairs to such Goods and/or Works as promptly as reasonably practicable.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "142.08px" }} className="cls_009"><span className="cls_009">CLAUSE 3. PRICES, TERMS OF PAYMENT AND INVOICING</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "142.08px" }} className="cls_010"><span className="cls_010">10.3 The Supplier shall warrant that the Goods and/or Works executed pursuant to the performance of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "147.84px" }} className="cls_010"><span className="cls_010">3.1 Unless otherwise agreed, all Order prices shall be fixed, firm and not subject to revision.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "147.84px" }} className="cls_010"><span className="cls_010">the Works shall be free from defect within the period specified in the Order (“Warranty Period”). In the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "153.60px" }} className="cls_010"><span className="cls_010">3.2 Unless otherwise specified in the Order, all Goods shall be delivered to Engseen’s designated</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "153.60px" }} className="cls_010"><span className="cls_010">event of any defects found within the Warranty Period, Clause 11 shall apply.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "159.30px" }} className="cls_010"><span className="cls_010">location with all customs, duties, taxes, freight charges, insurance and other costs and expenses relating</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "159.30px" }} className="cls_010"><span className="cls_010">10.4 In the event of any part replaced or repaired during the Warranty Period suffers from recurrent</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "165.06px" }} className="cls_010"><span className="cls_010">to the transportation and delivery of the Goods being paid by the Supplier.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "165.06px" }} className="cls_010"><span className="cls_010">defect, the Warranty Period for the Goods or the parts of the Works that suffer from such defect shall be</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "170.82px" }} className="cls_010"><span className="cls_010">3.3 The terms of payment are indicated in the Order. The payment of an invoice shall not constitute</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "170.82px" }} className="cls_010"><span className="cls_010">deemed to start anew and commence from the day on which such Goods or Works are changed,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "176.58px" }} className="cls_010"><span className="cls_010">acceptance of the Goods delivered or Works executed. If retention sum is applicable, Engseen shall be</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "176.58px" }} className="cls_010"><span className="cls_010">modified, remedied or replaced for and additional period equivalent to the Warranty Period.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "182.34px" }} className="cls_010"><span className="cls_010">entitled to withhold or deduct any sum for payment to the Supplier in accordance with terms set out in the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "182.34px" }} className="cls_009"><span className="cls_009">CLAUSE 11. REMEDYING DEFECTS OR REPAIR AND REPLACEMENT</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "188.10px" }} className="cls_010"><span className="cls_010">Order for any such retention.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "188.10px" }} className="cls_010"><span className="cls_010">11.1 In the event of a defect or failure or non-conformity with the Specifications in the Goods and/or</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "193.80px" }} className="cls_010"><span className="cls_010">3.4 Invoicing shall be made in accordance with the arrangements set out in the Order. Any invoice issued</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "193.80px" }} className="cls_010"><span className="cls_010">Works (“Defects”) which becomes apparent within the Warranty Period, the Supplier shall, within forty</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "199.56px" }} className="cls_010"><span className="cls_010">by the Supplier not stating the relevant Order number shall be deferred without additional expenses for</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "199.56px" }} className="cls_010"><span className="cls_010">eight (48) hours after receipt of a written notice from Engseen, submit to Engseen a proposal for remedial</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "205.32px" }} className="cls_010"><span className="cls_010">Engseen.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "205.32px" }} className="cls_010"><span className="cls_010">actions. Upon Engseen’s approval, the Supplier shall with due diligence, make good or correct the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "211.08px" }} className="cls_010"><span className="cls_010">3.5 To secure the performance of the Supplier in the execution of the Works, Engseen may require the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "211.08px" }} className="cls_010"><span className="cls_010">Defects or replace the Goods, all at Supplier’s sole cost and expense within seven (7) days or such other</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "216.84px" }} className="cls_010"><span className="cls_010">Supplier to provide a performance security at the amount to be specified in the Order from a third party</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "216.84px" }} className="cls_010"><span className="cls_010">period agreed by Engseen.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "222.60px" }} className="cls_010"><span className="cls_010">approved by Engseen according to the terms stated in the Order.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "222.60px" }} className="cls_010"><span className="cls_010">11.2 The rejected Goods and/or non-conforming or defective Works shall be held entirety at the risk of the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "228.30px" }} className="cls_009"><span className="cls_009">CLAUSE 4. QUALITY AND SAFETY</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "228.30px" }} className="cls_010"><span className="cls_010">Supplier and shall be removed by the Supplier at its own risk and expense. The Supplier shall reimburse</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "234.06px" }} className="cls_010"><span className="cls_010">4.1 All Goods supplied shall:</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "234.06px" }} className="cls_010"><span className="cls_010">and refund Engseen the whole or part of any payment made in respect of any rejected Goods and/or non-</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "239.82px" }} className="cls_010"><span className="cls_010">4.1.1 be in accordance with the quantity, quality, description and other particulars contained in the Order</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "239.82px" }} className="cls_010"><span className="cls_010">conforming Works or Defects which cannot be rectified or repaired by the Supplier.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "245.58px" }} className="cls_010"><span className="cls_010">and any sample, drawing, description and specification given to the Supplier by Engseen and all</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "245.58px" }} className="cls_010"><span className="cls_010">11.3 All costs and charges incurred in remedying the Defects, including but not limited to any costs</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "251.34px" }} className="cls_010"><span className="cls_010">applicable standards under the applicable law (“Specifications”);</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "251.34px" }} className="cls_010"><span className="cls_010">relating to the repair, replacement, packing, handling, transportation and delivery of Goods and/or Works</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "257.10px" }} className="cls_010"><span className="cls_010">4.1.2 be of satisfactory quality, fit for purpose or any intended use expressly or impliedly made known to</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "257.10px" }} className="cls_010"><span className="cls_010">shall be fully borne by the Supplier.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "262.80px" }} className="cls_010"><span className="cls_010">the Supplier; and</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "262.80px" }} className="cls_009"><span className="cls_009">CLAUSE 12. INTELLECTUAL PROPERTY</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "268.56px" }} className="cls_010"><span className="cls_010">4.1.3 free from defects in title, lien, encumbrances and claims.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "268.56px" }} className="cls_010"><span className="cls_010">12.1 The Supplier represents and warrants that (i) any matter it furnishes for delivery of the Goods and/or</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "274.32px" }} className="cls_010"><span className="cls_010">4.2 All Works performed shall:</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "274.32px" }} className="cls_010"><span className="cls_010">execution of the Works does not infringe or violate any trademarks, patents, registered design, copyright,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "280.08px" }} className="cls_010"><span className="cls_010">4.2.1 comply with the performance Specifications in the Contract and in accordance with the best industry</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "280.08px" }} className="cls_010"><span className="cls_010">trademark or trade name or other legal rights of any third parties; and (ii) it has all necessary permits and</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "285.84px" }} className="cls_010"><span className="cls_010">practice and all applicable standards, regulations and such other statutory requirements relating to the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "285.84px" }} className="cls_010"><span className="cls_010">licences to allow it to sell the Goods and execute the Works to and for the Engseen.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "291.54px" }} className="cls_010"><span className="cls_010">Works to be executed.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "291.54px" }} className="cls_010"><span className="cls_010">12.2 The Supplier shall fully indemnify and hold Engseen harmless against all actions or claims, liability,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "297.30px" }} className="cls_010"><span className="cls_010">4.2.2 be executed in a proper and skillful manner by properly qualified and experienced personnel of the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "297.30px" }} className="cls_010"><span className="cls_010">loss, costs, attorney’s fees, expenses and damages due to or arising from any infringement of intellectual</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "303.06px" }} className="cls_010"><span className="cls_010">Supplier and in accordance with the best industry practice.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "303.06px" }} className="cls_010"><span className="cls_010">property rights. The Supplier shall, at its own expense, defend Engseen against all such claims,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "308.82px" }} className="cls_010"><span className="cls_010">4.3 The Goods and/or Works referred to in Sub-Clause 4.1 and Sub-Clause 4.2 shall include and apply to</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "308.82px" }} className="cls_010"><span className="cls_010">proceedings and suits.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "314.58px" }} className="cls_010"><span className="cls_010">any replacement, repaired, substituted or remedial Goods and/or Works provided by the Supplier</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "314.58px" }} className="cls_010"><span className="cls_010">12.3 In case any item delivered by the Supplier under this GPTC is in any such suit held to constitute an</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "320.34px" }} className="cls_010"><span className="cls_010">pursuant to Clause 11.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "320.33px" }} className="cls_010"><span className="cls_010">infringement, and its use is enjoined, the Supplier shall at its option and expense:(i) procure for Engseen</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "326.04px" }} className="cls_010"><span className="cls_010">4.4 In case of attendance at any Engseen’s premises or such other premises designated by Engseen, the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "326.04px" }} className="cls_010"><span className="cls_010">the right to continue using the item concerned; or(ii) replace or modify the item so that it becomes non-</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "331.80px" }} className="cls_010"><span className="cls_010">Supplier shall be responsible for ensuring compliance with all provisions applying to the premises</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "331.79px" }} className="cls_010"><span className="cls_010">infringing yet remains functionally and substantially equivalent.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "337.56px" }} className="cls_010"><span className="cls_010">concerning hygiene, security and environment, both by itself and by its employees who are under its</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "337.55px" }} className="cls_009"><span className="cls_009">CLAUSE 13. BUYER’S DRAWINGS AND DOCUMENTS</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "343.32px" }} className="cls_010"><span className="cls_010">responsibility. The Supplier shall not be entitled to claim for any compensation resulting therefrom. The</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "343.32px" }} className="cls_010"><span className="cls_010">13.1 The ownership and intellectual property rights in all documents and software including but not limited</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "349.08px" }} className="cls_010"><span className="cls_010">Supplier is required to obtain information as to the existence of such provisions before carrying out the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "349.08px" }} className="cls_010"><span className="cls_010">to all drawings, blueprints, tracings and other items provided by Engseen to the Supplier or developed by</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "354.83px" }} className="cls_010"><span className="cls_010">Order. Works on Engseen’s premises or such other premises designated by Engseen shall be executed</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "354.84px" }} className="cls_010"><span className="cls_010">the Supplier in the course of executing the Works based on Engseen’s Specifications (collectively,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "360.54px" }} className="cls_010"><span className="cls_010">in compliance with applicable on-site rules and regulations and as part of instructions on security,</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "360.54px" }} className="cls_010"><span className="cls_010">“Documents”) shall be the sole property of the Engseen at all times. All Documents and any copies shall</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "366.29px" }} className="cls_010"><span className="cls_010">administrative rules and general conditions of execution transmitted or given verbally before admission to</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "366.30px" }} className="cls_010"><span className="cls_010">be delivered to Engseen upon the delivery of the Goods and/or completion of the Works regardless of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "372.05px" }} className="cls_010"><span className="cls_010">site.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "372.06px" }} className="cls_010"><span className="cls_010">whether payment has been made to the Supplier.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "377.81px" }} className="cls_009"><span className="cls_009">CLAUSE 5. VARIATION</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "377.82px" }} className="cls_009"><span className="cls_009">CLAUSE 14. INSURANCE</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "383.57px" }} className="cls_010"><span className="cls_010">5.1 Engseen may make any variation to the form, quality or quantity of the Goods and/or Works or any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "383.58px" }} className="cls_010"><span className="cls_010">14.1 In addition to its legal liability, the Supplier remains automatically liable to Engseen as well as any</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "389.27px" }} className="cls_010"><span className="cls_010">schedule for the execution of the Works or any part thereof (“Variation”) but the effect, if any, of any such</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "389.28px" }} className="cls_010"><span className="cls_010">third party for damages of any nature likely to be caused to them by the Supplier in the course of the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "395.03px" }} className="cls_010"><span className="cls_010">Variation shall be valued in accordance with schedule of rates where applicable and if not applicable,</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "395.04px" }} className="cls_010"><span className="cls_010">supply of the Goods and/or execution of the Works. These damages may be the direct and/or indirect</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "400.79px" }} className="cls_010"><span className="cls_010">prices shall be reasonably agreed between the parties.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "400.80px" }} className="cls_010"><span className="cls_010">consequences arising from the supply of the Goods and/or the execution of the Works. The Supplier also</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "406.55px" }} className="cls_010"><span className="cls_010">5.2 Any instructions for Variation by Engseen (“Variation Order”) shall contain information as to the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "406.56px" }} className="cls_010"><span className="cls_010">undertakes to fully indemnify Engseen for any recourse and/or any claim that third parties may bring</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "412.31px" }} className="cls_010"><span className="cls_010">quantities and scope of Works and signed by Engseen’s authorised representatives. No Variation can be</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "412.32px" }} className="cls_010"><span className="cls_010">against Engseen within the context of the Order and to be responsible for all financial consequences,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "418.08px" }} className="cls_010"><span className="cls_010">undertaken without a Variation Order.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "418.08px" }} className="cls_010"><span className="cls_010">which may result from such recourse and/or claim.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "423.78px" }} className="cls_009"><span className="cls_009">CLAUSE 6. DELIVERY OF GOODS AND COMPLETION OF WORKS</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "423.78px" }} className="cls_010"><span className="cls_010">14.2 The Supplier shall procure all necessary insurance to cover for all the liabilities it incurs or may incur</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "429.54px" }} className="cls_010"><span className="cls_010">6.1 The Supplier commits to inspect the Goods, before delivery, for compliance with the Specifications</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "429.54px" }} className="cls_010"><span className="cls_010">pursuant to the Order and as described in the foregoing Sub-Clause 14.1. The Supplier undertakes to</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "435.30px" }} className="cls_010"><span className="cls_010">and to properly pack them so that they shall not be damaged during transportation. The Supplier is</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "435.30px" }} className="cls_010"><span className="cls_010">provide Engseen, without delay, with all certificates for the insurance covers it has procured in</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "441.06px" }} className="cls_010"><span className="cls_010">obliged to comply with all contractual lead-times provided and set out under the Order (“Delivery Date”).</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "441.06px" }} className="cls_010"><span className="cls_010">accordance with this Clause and with the requirements of Engseen. These obligations do not release the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "446.82px" }} className="cls_010"><span className="cls_010">Engseen shall be entitled to terminate the Order if it is not executed within the contractual lead-times or</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "446.82px" }} className="cls_010"><span className="cls_010">Supplier in any event from its liability. In particular, the Supplier remains liable for the damages for its</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "452.58px" }} className="cls_010"><span className="cls_010">after the extended lead-times set out by Engseen. Engseen reserves the right to refuse partial or early</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "452.58px" }} className="cls_010"><span className="cls_010">account where the financial consequences may not be covered, totally or in part, by its insurance.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "458.28px" }} className="cls_010"><span className="cls_010">deliveries and may return the Goods at the Supplier’s costs and risks.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "458.28px" }} className="cls_009"><span className="cls_009">CLAUSE 15. CONFIDENTIALITY AND PUBLICITY</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "464.04px" }} className="cls_010"><span className="cls_010">6.2 The Supplier shall commence the Works on the date specified in the Order and shall complete within</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "464.04px" }} className="cls_010"><span className="cls_010">15.1 The Supplier shall keep and cause to keep in confidence, all data it may receive at the time pursuant</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "469.80px" }} className="cls_010"><span className="cls_010">the period specified in the Order or the Works schedule agreed in writing by Engseen (“Completion</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "469.80px" }} className="cls_010"><span className="cls_010">to the Order. The Supplier agrees to refrain from disclosing any such data to third parties and/or using</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "475.56px" }} className="cls_010"><span className="cls_010">Date”).</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "475.56px" }} className="cls_010"><span className="cls_010">them in any form whatsoever, for purposes other than carrying out the Order without the prior written</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "481.32px" }} className="cls_010"><span className="cls_010">6.3 Time is of the essence in the Supplier’s delivery of Goods and/or completion of Works under this</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "481.32px" }} className="cls_010"><span className="cls_010">consent of Engseen.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "487.08px" }} className="cls_010"><span className="cls_010">Contract. The Supplier will promptly notify Engseen if the Delivery Date and/or Completion Date cannot</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "487.08px" }} className="cls_010"><span className="cls_010">15.2 The Supplier shall not carry out any advertising or publicity in respect of the Order without the prior</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "492.78px" }} className="cls_010"><span className="cls_010">be met or is likely to be delayed or disrupted together with supporting details (“Delay Notice”).</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "492.78px" }} className="cls_010"><span className="cls_010">written approval of Engseen.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "498.54px" }} className="cls_010"><span className="cls_010">6.4 On receipt of the Delay Notice, Engseen shall be entitled but is under no obligation to extend the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "498.54px" }} className="cls_009"><span className="cls_009">CLAUSE 16. TERMINATION</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "504.30px" }} className="cls_010"><span className="cls_010">Delivery Date and/or Completion Date as appropriate which shall not constitute Engseen’s waiver of any</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "504.30px" }} className="cls_010"><span className="cls_010">16.1 If the Supplier fails to perform or partially perform any of its obligations in respect of an Order,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "510.06px" }} className="cls_010"><span className="cls_010">of the Supplier’s obligations or prejudice any of Engseen’s rights under the Contract.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "510.06px" }} className="cls_010"><span className="cls_010">including in the event the Supplier‘s financial condition may reasonably be construed as preventing the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "515.82px" }} className="cls_010"><span className="cls_010">6.5 If the Supplier fails to deliver the Goods on Delivery Date and/or complete the Works on Completion</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "515.82px" }} className="cls_010"><span className="cls_010">proper performance of the Order and the Supplier fails to remedy any such performance within the period</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "521.52px" }} className="cls_010"><span className="cls_010">Date, the Supplier shall be liable to pay the amount specified in the Order as liquidated damages for each</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "521.52px" }} className="cls_010"><span className="cls_010">prescribed in the formal letter of demand issued by Engseen to the Supplier notifying the Supplier of its</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "527.28px" }} className="cls_010"><span className="cls_010">day for which the Supplier fails to deliver the Goods and/ or complete the Works by the Delivery Date</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "527.28px" }} className="cls_010"><span className="cls_010">default, such Order may be terminated in whole or part by Engseen by giving the Supplier a fifteen (15)</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "533.04px" }} className="cls_010"><span className="cls_010">and/or Completion Date, as applicable. Notwithstanding the aforementioned, the Supplier shall also be</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "533.04px" }} className="cls_010"><span className="cls_010">days prior notice and such termination shall take effect upon expiry of such fifteen (15) days. Any</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "538.80px" }} className="cls_010"><span className="cls_010">liable for all actual and reasonable costs and damages which Engseen incurs as a result of the late</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "538.80px" }} className="cls_010"><span className="cls_010">termination shall be without prejudice to any liquidated damages and to any damages that could be</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "544.56px" }} className="cls_010"><span className="cls_010">delivery of the Goods and/or late completion of the Works.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "544.56px" }} className="cls_010"><span className="cls_010">claimed by Engseen from the Supplier.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "550.32px" }} className="cls_010"><span className="cls_010">6.6 Engseen may at any time instruct the Supplier to suspend the delivery of the Goods and/or execution</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "550.32px" }} className="cls_010"><span className="cls_010">16.2 Any breach of the confidentiality obligations provided in Clause 15 by the Supplier may automatically</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "556.02px" }} className="cls_010"><span className="cls_010">of the Works or any part thereof, provided that Engseen has reasonable cause to do so and Engseen in</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "556.02px" }} className="cls_010"><span className="cls_010">give rise to the termination of the Order, at the demand of Engseen, without prejudice to any potential</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "561.78px" }} className="cls_010"><span className="cls_010">so doing, shall act in good faith. The Supplier shall not be entitled to be paid any additional cost during</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "561.78px" }} className="cls_010"><span className="cls_010">claims for loss and damages by Engseen.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "567.54px" }} className="cls_010"><span className="cls_010">the suspension period, unless otherwise agreed by the Parties.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "567.54px" }} className="cls_010"><span className="cls_010">16.3 Engseen shall be entitled to charge to the Supplier any positive cost differential between the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "573.30px" }} className="cls_009"><span className="cls_009">CLAUSE 7. TRANSFER OF TITLE AND RISK</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "573.30px" }} className="cls_010"><span className="cls_010">replacement Goods which Engseen is required to acquire from other suppliers and/or the appointment of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "579.06px" }} className="cls_010"><span className="cls_010">7.1 The transfer of title to the Goods takes place after delivery at the place specified in the Order. Unless</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "579.06px" }} className="cls_010"><span className="cls_010">a new contractor to execute the uncompleted Works due to the termination of the Order and the prices of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "584.82px" }} className="cls_010"><span className="cls_010">expressly accepted by Engseen, any title retention clause shall be deemed invalid. If the Goods must be</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "584.82px" }} className="cls_010"><span className="cls_010">the Goods and/or Works as stated in the Order.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "590.52px" }} className="cls_010"><span className="cls_010">manufactured or performed over a certain period of time, the transfer of title to Engseen shall take place</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "590.52px" }} className="cls_010"><span className="cls_010">16.4 Engseen shall be entitled to terminate the Order or part thereof at its convenience provided always</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "596.28px" }} className="cls_010"><span className="cls_010">gradually according to the progression of the manufacturing operations or performance, with the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "596.28px" }} className="cls_010"><span className="cls_010">that the Supplier shall be paid the amounts payable for any Goods delivered and accepted by the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "602.04px" }} className="cls_010"><span className="cls_010">exception of risks that shall remain the responsibility of the Supplier according to the provisions</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "602.04px" }} className="cls_010"><span className="cls_010">Engseen and/or Works executed up to the date of termination of the Order and all reasonable costs which</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "607.80px" }} className="cls_010"><span className="cls_010">hereunder.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "607.80px" }} className="cls_010"><span className="cls_010">have been committed by the Supplier in anticipation of the full delivery of the Goods and/ or the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "613.56px" }} className="cls_010"><span className="cls_010">7.2 If the Goods or any part thereof are nonconforming, the Supplier shall continue to bear the risk of loss</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "613.56px" }} className="cls_010"><span className="cls_010">completion of the Works. Upon the termination of the Order pursuant to this Sub-Clause, the Supplier</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "619.26px" }} className="cls_010"><span className="cls_010">as to them until the cure of the defect or acceptance by Engseen, whichever is earlier.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "619.26px" }} className="cls_010"><span className="cls_010">shall immediately cease the performance of the whole or part of the work in progress and take all</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "625.02px" }} className="cls_010"><span className="cls_010">7.3 Title to any Goods that are rejected on receipt or retention of which is refused by Engseen, or</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "625.02px" }} className="cls_010"><span className="cls_010">reasonable steps to minimize the incurrence of costs allocable to the work and the Engseen’s sole liability</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "630.78px" }} className="cls_010"><span className="cls_010">acceptance of which is justifiably revoked, shall re-vest in the Supplier, whereupon the Supplier shall bear</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "630.78px" }} className="cls_010"><span className="cls_010">is to pay the Supplier the amounts payable for any Goods delivered and accepted by the Engseen and/or</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "636.54px" }} className="cls_010"><span className="cls_010">all responsibility for the Goods and liability under all applicable environmental laws, including liability for</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "636.54px" }} className="cls_010"><span className="cls_010">Works up to the date of termination of the Contract.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "642.30px" }} className="cls_010"><span className="cls_010">disposal thereof, against which the Supplier shall indemnify Engseen.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "642.30px" }} className="cls_010"><span className="cls_010">16.5 The termination of the Order shall be without prejudice to the rights and remedies of the parties</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "648.06px" }} className="cls_009"><span className="cls_009">CLAUSE 8. INSPECTION AND TESTING</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "648.05px" }} className="cls_010"><span className="cls_010">which have accrued prior to the termination of the Order.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "653.76px" }} className="cls_010"><span className="cls_010">8.1 The Buyer reserves the right to inspect and test the Goods and/or the Works at any stage at the site</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "653.76px" }} className="cls_010"><span className="cls_010">16.6 Relevant obligations of the parties set out in clauses of this GPTC relating to confidentiality,</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "659.52px" }} className="cls_010"><span className="cls_010">at which the Works are to be executed (“Site”) and/or the Supplier’s premises and the Supplier shall give</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "659.51px" }} className="cls_010"><span className="cls_010">ownership, intellectual property rights, indemnities and any rights arising on termination shall survive the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "665.28px" }} className="cls_010"><span className="cls_010">rights of access to premises and such facilities as Engseen may reasonably require for such inspection at</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "665.27px" }} className="cls_010"><span className="cls_010">termination.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "671.04px" }} className="cls_010"><span className="cls_010">the Supplier’s cost and expense.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "671.03px" }} className="cls_009"><span className="cls_009">CLAUSE 17. SUB-CONTRACTING</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "676.80px" }} className="cls_010"><span className="cls_010">8.2 The Supplier shall comply strictly and fully with the test requirements as stipulated by Engseen in</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "676.79px" }} className="cls_010"><span className="cls_010">17.1 Any subcontracting of the whole or a part of the Order must have received the prior written</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "682.56px" }} className="cls_010"><span className="cls_010">accordance with the Specifications, drawings, instructions or standards supplied or agreed by Engseen,</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "682.55px" }} className="cls_010"><span className="cls_010">agreement of Engseen. In any event, the Supplier remains solely liable for the performance of the Order</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "688.26px" }} className="cls_010"><span className="cls_010">as specified in the Order and required under the law and shall furnish the test results to Engseen.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "688.25px" }} className="cls_010"><span className="cls_010">and guarantees that its subcontractor(s) shall conform to the terms hereof. The Supplier in particular</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "694.02px" }} className="cls_010"><span className="cls_010">8.3 Passing of inspection and testing or acceptance of inspection and testing results in respect of the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "694.01px" }} className="cls_010"><span className="cls_010">undertakes to ensure that its subcontractors adhere to the present GPTC.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "699.78px" }} className="cls_010"><span className="cls_010">Goods and/or Works will not constitute Engseen’s waiver of any of the Supplier’s obligations or prejudice</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "699.78px" }} className="cls_009"><span className="cls_009">CLAUSE 18. ASSIGNMENT</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "705.54px" }} className="cls_010"><span className="cls_010">any of Engseen’s rights under the Contract.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "705.54px" }} className="cls_010"><span className="cls_010">18.1 The Order is neither assignable nor transferable by the Supplier, whether in whole or in part, without</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "711.30px" }} className="cls_009"><span className="cls_009">CLAUSE 9. ACCEPTANCE OR TAKING-OVER</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "711.30px" }} className="cls_010"><span className="cls_010">the prior written and express approval of Engseen. The Supplier shall inform Engseen without delay of</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "717.05px" }} className="cls_010"><span className="cls_010">9.1 The receipt of Goods shall be made according to the applicable Site rules. Engseen shall not be</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "717.06px" }} className="cls_010"><span className="cls_010">any important change to its legal structure or any change of control of its capital. In such cases, Engseen</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "722.76px" }} className="cls_010"><span className="cls_010">deemed to have accepted any Goods until it has had reasonable time to verify if they conform to the</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "722.76px" }} className="cls_010"><span className="cls_010">may terminate the Order as of right without any compensation to the Supplier if Engseen is of the</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "728.51px" }} className="cls_010"><span className="cls_010">Specifications set out in the Order. The release given at the time of receipt as evidenced by the delivery</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "728.52px" }} className="cls_010"><span className="cls_010">reasonable view that any such change shall adversely affect the proper performance of the Supplier in</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "734.27px" }} className="cls_010"><span className="cls_010">note signed by Engseen shall not be deemed as discharging the Supplier where later inspection reveal</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "734.28px" }} className="cls_010"><span className="cls_010">respect of the Order.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "740.03px" }} className="cls_010"><span className="cls_010">that the Goods delivered do not conform to the Order’s Specifications.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "740.04px" }} className="cls_009"><span className="cls_009">CLAUSE 19. STAMP DUTY</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "745.79px" }} className="cls_010"><span className="cls_010">9.2 Engseen shall notify the Supplier when he considers that the Supplier has completed the Works in</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "745.80px" }} className="cls_010"><span className="cls_010">19.1 The stamp duty payable for the sale of the Goods and/or execution of the Works pursuant to or in</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "751.49px" }} className="cls_010"><span className="cls_010">accordance with this Contract stating the date accordingly (“Taking-Over Notice”).</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "751.50px" }} className="cls_010"><span className="cls_010">relation to this Order shall be borne by the Supplier.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "757.25px" }} className="cls_010"><span className="cls_010">9.3 Upon issuance of the Taking-Over Notice, Engseen shall take over the Works and subject to Clause</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "757.26px" }} className="cls_009"><span className="cls_009">CLAUSE 20. ENTIRE AGREEMENT</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "763.02px" }} className="cls_010"><span className="cls_010">11, the Supplier shall promptly complete any outstanding work, remove from the site at which the Works</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "763.02px" }} className="cls_010"><span className="cls_010">20.1 This Contract constitutes the entire agreement between Engseen and the Employer with respect to</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "768.78px" }} className="cls_010"><span className="cls_010">are to be performed any and all their equipment, materials, employees, wreckage, rubbish or temporary</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "768.78px" }} className="cls_010"><span className="cls_010">the subject matter of this Contract and supersedes all communications, negotiations and agreements</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "774.54px" }} className="cls_010"><span className="cls_010">works no longer required and shall make the Works ready for use and in a good working condition within</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "774.54px" }} className="cls_010"><span className="cls_010">whether made in writing or orally of both parties made prior to the date of this Contract</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "780.30px" }} className="cls_010"><span className="cls_010">the period specified by Engseen.</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "780.30px" }} className="cls_009"><span className="cls_009">CLAUSE 21. GOVERNING LAW</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "786.00px" }} className="cls_010"><span className="cls_010">9.4 Any payment made in respect of Goods and/or Works provided by the Supplier prior to the inspection</span></div>
            <div style={{ position: "absolute", left: "325.98px", top: "786.00px" }} className="cls_010"><span className="cls_010">21.1 The Order shall be exclusively governed and construed in accordance with the laws of Malaysia.</span></div>
            <div style={{ position: "absolute", left: "56.70px", top: "791.76px" }} className="cls_010"><span className="cls_010">by Engseen shall not constitute acceptance of the Goods and/or Works. Acceptance shall be deemed to</span></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseOrderTemplate;