import { MACHINES, formatPrice, type Faq } from "./catalogue";
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
    a: `Zoomlion is a major international manufacturer of construction machinery, known for strong, well-equipped machines at competitive prices. In Ireland, Zoomlion machines are supplied through ${DEALER.name}, the authorised distributor, with genuine parts and local service.`,
  },
  {
    q: "How much do Zoomlion machines cost in Ireland?",
    a: `${MACHINES.map((m) => (m.price === null ? `the Zoomlion ${m.model} ${m.type.toLowerCase()} is priced on request` : `the Zoomlion ${m.model} ${m.type.toLowerCase()} is ${formatPrice(m.price)}`)).join("; ").replace(/^t/, "T")}. Attachments, delivery and finance are quoted on request.`,
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
