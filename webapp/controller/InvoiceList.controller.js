sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/ListBase",
    "sap/ui/demo/walkthrough/common/Utils",
  ],
  function (
    Controller,
    JSONModel,
    formatter,
    Filter,
    FilterOperator,
    ListBase,
    Utils
  ) {
    "use strict";

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
      formatter: formatter,
      onInit: function () {
        var oViewModel = new JSONModel({
          currency: "EUR",
          summary: 0,
        });
        this.getView().setModel(oViewModel, "view");
      },
      onFilterInvoice: function (oEvent) {
        var aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(
            new Filter("ProductName", FilterOperator.Contains, sQuery)
          );
        }

        // filter binding
        var oList = this.byId("invoiceList");
        var oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
        console.log(oList);
      },

      onPress: function (oEvent) {
        var oItem = oEvent.getSource();
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("detail", {
          invoicePath: window.encodeURIComponent(
            oItem.getBindingContext("invoice").getPath().substr(1)
          ),
        });
      },

      // Summary quantity handler
      onSummary: function (oEvent) {
        // let iCount = oEvent.getParameters().total;
        let iSum = 0;
        let oTable = oEvent.getSource().getItems();
        for (let i = 0; i < oTable.length; i++) {
          let oBinding = oTable[i].getBindingContext("invoice");
          if (!oBinding) {
            continue;
          }
          let oObject = oBinding.getObject();
          if (!oObject) {
            continue;
          }
          if (!oObject.Quantity) {
            continue;
          }
          let nQuantity = oObject.Quantity;
          if (typeof nQuantity === "number") {
            iSum += nQuantity;
          }
        }

        // Assign Summary to View
        this.getView().getModel("view").setProperty("/summary", iSum);
      },

      // Open Dialog Handler
      onOpenDialog: function () {
        const oDialog = Utils.getFragment(null, "HelloDialog", this);
        const oModel = this.getView().getModel("invoice");
        oDialog.setModel(oModel, "invoice");
        oDialog.open();
      },

      // Close Dialog Handler
      onCloseDialog: function () {
        const oDialog = Utils.getFragment(null, "HelloDialog", this);
        oDialog.close();
        sap.m.MessageToast.show("Success", {
          duration: "2000",
          at: "right bottom",
        });
      },
    });
  }
);
