sap.ui.define([], function() {
    return {
        customFormat: function() {
            // use ui5 formatter for chart
            // 'axisFormat' and 'datalabelFormat' formatstring
            // in properties is processed by ui5 formatter
            var customFormatter = {
                format: function(value, pattern) {
                    var formattedString = value;
                    if (pattern == "datalabelFormat") {
                        if (value > 1) {
                            var datalabelFormat = sap.ui.core.format.FileSizeFormat.getInstance();
                            datalabelFormat.oNumberFormat.oFormatOptions.maxFractionDigits = 2;
                            formattedString = datalabelFormat.format(value);
                            formattedString = formattedString.substring(
                            0, formattedString.length - 1);
                        } else if (value < 1) {
                            var datalabelFormatPercent = sap.ui.core.format.NumberFormat.getPercentInstance();
                            datalabelFormatPercent.oFormatOptions.maxFractionDigits = 2;
                            formattedString = datalabelFormatPercent.format(value);
                        }
                    } else if (pattern == "axisFormat") {
                        if (value > 1) {
                            var axisFormat = sap.ui.core.format.FileSizeFormat.getInstance();
                            axisFormat.oNumberFormat.oFormatOptions.maxFractionDigits = 1;
                            formattedString = axisFormat.format(value);
                            formattedString = formattedString.substring(
                            0, formattedString.length - 1);
                        } else if (value < 1) {
                            var axisFormatPercent = sap.ui.core.format.NumberFormat.getPercentInstance();
                            formattedString = axisFormatPercent.format(value);
                        }
                    } else {
                        if (value > 1) {
                            formattedString = value;
                        } else if (value < 1) {
                            var popoverFormatPercent = sap.ui.core.format.NumberFormat.getPercentInstance();
                            popoverFormatPercent.oFormatOptions.maxFractionDigits = 2;
                            formattedString = popoverFormatPercent.format(value);
                        }
                    }
                    if (value == 0) {
                        formattedString = "0";
                    }
                    if (value == 1) {
                        formattedString = "100%"
                    }
                    return formattedString;
                }
            };
            jQuery.sap.require("sap.ui.core.format.DateFormat");
            jQuery.sap.require("sap.ui.core.format.FileSizeFormat");
            jQuery.sap.require("sap.ui.core.format.NumberFormat");
            sap.viz.api.env.Format.numericFormatter(customFormatter);
        },

        loadLibrary: function(vizframe, fixflex) {
            // try to load sap.suite.ui.commons for using
            // ChartContainer
            // sap.suite.ui.commons is available in
            // sapui5-sdk-dist but not in demokit
            var bSuiteAvailable = jQuery.sap.sjax({
                type: "HEAD",
                url: sap.ui.resource("sap.suite.ui.commons", "library.js")
            }).success;
            if (bSuiteAvailable) {
                sap.ui.getCore().loadLibrary("sap.suite.ui.commons")
                var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
                    icon: "sap-icon://line-chart",
                    title: "Line Chart",
                    content: [vizframe]
                });
                var oChartContainer = new sap.suite.ui.commons.ChartContainer({
                    content: [oChartContainerContent]
                });
                oChartContainer.setShowFullScreen(false);
                oChartContainer.setAutoAdjustHeight(true);
                fixflex.destroyFlexContent();
                fixflex.setFlexContent(oChartContainer);
            }
        },

        setExpanding: function(panel) {
            if (jQuery(document).width() < 550) {
                panel.setExpanded(false);
            }
            jQuery(window).resize(function() {
                if (jQuery(document).width() < 550) {
                    panel.setExpanded(false);
                } else {
                    panel.setExpanded(true);
                }
            });
        },

        adjustStyle: function(oBox1, oBox2, oBox3, oHBox) {
            try {
                if (jQuery("html").attr("dir") == "rtl") {
                    if (oBox1) {
                        oBox1.removeStyleClass("boxPosition");
                        oBox1.addStyleClass("boxPositionRTL");
                    }
                    if (oBox2) {
                        oBox2.removeStyleClass("boxPosition");
                        oBox2.addStyleClass("boxPositionRTL");
                    }
                    if (oBox3) {
                        oBox3.removeStyleClass("boxPosition");
                        oBox3.addStyleClass("boxPositionRTL");
                    }
                    if (oHBox) {
                        oHBox.removeStyleClass("HBoxStyle");
                        oHBox.addStyleClass("HBoxStyleRTL");
                    }
                }
            } catch (e) {;
            }

        }
    };
});