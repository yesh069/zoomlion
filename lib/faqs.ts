import type { Faq } from "./catalogue";
import { DEALER } from "./site";

// Site-wide questions. Each answer opens with the direct answer in one sentence,
// so search snippets and AI assistants can quote it as is.

export const BUYING_FAQS: Faq[] = [
  {
    q: "Where can I buy Zoomlion machinery in Ireland?",
    a: `${DEALER.name} is the authorised Zoomlion distributor in Ireland, based at Watergrasshill Business Park, Co. Cork (${DEALER.address.postcode}). You can request a quote on zoomlion.ie, call ${DEALER.phoneDisplay} or email ${DEALER.email}.`,
  },
  {
    q: "Is Zoomlion a good brand?",
    a: "Zoomlion is one of the world's largest construction machinery manufacturers. Founded in Changsha, China in 1992 and listed on the Shenzhen and Hong Kong stock exchanges, it builds cranes, aerial work platforms, telehandlers, excavators and concrete machinery for customers in more than 170 countries and regions.",
  },
  {
    q: "Why are there no prices on the website?",
    a: "Prices depend on the specification, attachments, finance and delivery you choose, so we quote each machine individually. Send a quote request and we will reply with a price for the exact machine you need.",
  },
  {
    q: "Do you offer finance on Zoomlion machines?",
    a: "Yes. We can arrange finance options such as hire purchase and leasing for business customers, subject to approval. Mention finance in your quote request and we will include repayment options.",
  },
  {
    q: "Who services and supplies parts for Zoomlion machines in Ireland?",
    a: `${DEALER.name} provides servicing, parts and after-sales support for the Zoomlion machines it supplies, from its depot in Watergrasshill, Co. Cork.`,
  },
  {
    q: "Do you deliver outside Co. Cork?",
    a: "Yes. We sell to customers across Ireland and can arrange delivery to your site or yard. Tell us your location when you ask for a quote.",
  },
];
