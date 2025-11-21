export enum AttrType {
    Literal = 1,
    Expression = 2,
    Boolean = 3
}

export interface Attr {
    key: string;
    value?: any;
    type: AttrType;
}

class El {
    tag: string;
    attrs: Attr[];
    children: El[];

    constructor(tag: string) {
        this.tag = tag;
        this.attrs = [];
        this.children = [];
    }

    static create(tag: string, attrs: Record<string, string> = {}): El {
        const el = new El(tag);
        for (const [key, value] of Object.entries(attrs)) {
            el.attrs.push({ key, value, type: AttrType.Literal });
        }
        return el;
    }

    attr(key: string, value?: any): this {
        if (value === undefined) {
            this.attrs.push({ key, type: AttrType.Boolean });
        } else {
            this.attrs.push({ key, value, type: AttrType.Literal });
        }
        return this;
    }

    exp(key: string, value: string): this {
        this.attrs.push({ key, value, type: AttrType.Expression });
        return this;
    }

    append(el: El): this {
        this.children.push(el);
        return this;
    }

    createChild(tag: string, attrs: Record<string, string> = {}): El {
        const child = new El(tag);
        for (const [key, value] of Object.entries(attrs)) {
            child.attrs.push({ key, value, type: AttrType.Literal });
        }
        this.children.push(child);
        return child;
    }

    toString(inc = 2, init = 0): string {
        const tab = " ".repeat(init);
        const attrStr = this.attrs
            .map(({ type, key, value }) => {
                if (type === AttrType.Expression) return `${key}={${value}}`;
                if (type === AttrType.Boolean) return key;
                return `${key}="${value}"`;
            })
            .join(" ");
        const tagAttrStr = `${this.tag} ${attrStr}`.trim();

        if (this.children.length === 0) {
            return `${tab}<${tagAttrStr}/>`;
        }

        let out = `${tab}<${tagAttrStr}>`;
        for (const child of this.children) {
            out += "\n" + child.toString(inc, init + inc);
        }
        out += `\n${tab}</${this.tag}>`;
        return out;
    }
}

export default El;