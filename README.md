#PAYMENT ROUTING DASHBOARD

##🎯 Objective
Our main aim is to streamline the process of setting up routing rules for payment transactions by developing a dashboard that allows the admin to enter new rules and update them frequently.
##💰 What is payment routing?
Payment routing is the path, or route, that a transaction takes after a customer makes a purchase. After a business accepts a payment method, like a credit card, it must then flow through the entire payment ecosystem composed of multiple parties: payment service provider (PSP), acquiring bank, card network, and issuing bank.
###Why is routing worth a shot?
Less Failed Transactions: While dynamic routing cannot solve failed transactions that come from customer or merchant issues, it can reduce transactions that fail because of technical issues on the processor’s end. These technical issues can include costly system failures when backup servers or alternative routing destinations are not established. Enabling multiple PSPs with routing will route payments to the right platform and solve most failed transactions.
Faster Transaction Approval: Dynamic routing finds the best route for payment data while taking into account network traffic and failures. This speeds up the entire payment routing process, which means transactions are approved more quickly.
Customizable Solutions: Businesses can suffer from a lack of options with specific PSPs (payment service providers). Because dynamic routing enables multiple PSPs, it enables businesses to utilize tools from many different providers to create a customized solution for their needs.
Real-Time Insights: Dynamic routing considers the performance of every route in real-time to calculate successful routes. This not only optimizes conversion rates but also provides up-to-date analytics and statistics for your business.
Cost-Effective Routing: Dynamic routing can determine the most cost-effective route by taking fees and even currency conversion rates into account when routing payments.
##🌟 Features of our dashboard
To make routing a piece of cake for you, the dashboard offers:
Support traffic routing based on defined rules per merchant/method. This will have priority-based rules with % based support.
An intuitive graphical interface, allows you to edit routing rules easily, without any coding.
The ability to create as many various routing schemes as you wish for greater flexibility. You can revise them to define the most efficient ones.
A powerful toolkit of accompanying features designed to boost the routing process with automatic sync with the main server.
##Basic Payment Terminologies
###Merchant: A merchant is a type of business bank account that allows a business to accept and process payment transactions.
###Payment Service Provider (PSP): PSPs are third-party companies that help business owners accept a wide range of online payment methods.
###Payment Method: A payment method is a way that customers pay for a product or service such as credit cards, prepaid cards, debit cards, or mobile payments
##Rules
Rules define the PSP servers the transaction request would be redirected to on the basis of conditions.
Each rule belongs to a category that is a unique combination of merchant and payment method.
Each rule in a category has a unique priority.
By default, a rule is assigned last priority on being added.
The priority of a rule can be updated by dragging it to the required position.
Users can deactivate and re-activate a rule.
Users can delete the rule too. It’s a soft delete and the rule will not be permanently deleted from the database.
Rule Structure
String name
String description
int priority (unique for each category)
String category (merchant + payment-method)
List<RuleCondition> ruleConditions
RuleResult
RuleCondition
Operand
Operator
Value
Rule Result
List<ResultOption> resultOptions
Result Option
String pspMerchantId;
double trafficPercentage;
String fallbackPspMerchantId;
UI Features
a) Navigation Bar With List view layout for each page->
i) NB Merchant (view)
ii) Psp Merchant ( view)
iii) PSP Merchant Method (view)
iv) Payment Routing => MVP


b) Routing Page ->
i ) List of all rules defined for merchant & payment method along with editing an individual rule.
ii) Selection pane for Merchant and Payment Method.
iii) Buttons to add a new rule, display inactive rules, and force a sync with the main server.


##Backend APIs
-GET /merchant/{id}, GET /merchant/all
-GET /psp/{id}, GET /psp/all
-GET /psp-merchant/{id}, GET /psp-merchant/all, GET /psp-merchant/{payment-method}
-GET /payment-method/{merchant}, GET /cardNetworks/all, GET /issuerNetworks/all
-GET /rule/all, GET /rules?merchant=NB_V1&method=CC, POST /rule, PUST /rule, DEL /rule, PUT/changeActivity/rules?merchant=NB_V1&method=CC, PUT/changePriority/rules?merchant=NB_V1&method=CC,
##Technologies Used
-Frontend: React, Redux, Redux-Saga (Codebase)
-Backend: Spring Framework, MongoDB Database, Redis (Codebase)
##💡 Future Developments
-Support for onboarding, editing, active/inactive, delete merchants, PSPs, and payment methods.
-Allow configuration of rules on the basis of time.
-Expand addition for rules for the wallet (PAYZAPP/SIMPL/MOBIKWIK) and UPI
-Time-specific rule conditions can be added.

