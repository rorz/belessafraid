import Markdoc from "@markdoc/markdoc";
import { MarkdocLink } from "../src/components/markdoc/link";

const nodes = {
  link: {
    ...Markdoc.nodes.link,
    render: MarkdocLink,
  },
};

export default nodes;
