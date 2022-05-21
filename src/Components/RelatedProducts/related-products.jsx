import React, { useMemo } from 'react'
import { Product } from '../';
import { nanoid } from "nanoid";
import "./related-products.scss";
import { useSelector } from 'react-redux';

export default function RelatedProducts({ category, id }) {
    const allItems = useSelector(obj => obj.allItems);
    const isPageDisabled = useSelector(obj => obj.isPageDisabled);

    const relatedProducts = useMemo(() => allItems
        .reduce((arr, elem) => {
            if (elem.category === category && elem.id !== id) {
                arr.push(elem);
            }
            return arr
        }, [])
        .slice(0, 4)
        .map(elem => <Product
            key={nanoid()}
            data={elem}
        />),
        [allItems]
    )

    return (
        <div className={`products-container ${isPageDisabled && "disabled-page"}`}>
            <h1 className="h1-black-default">RELATED PRODUCTS</h1>
            <div className="products-items-4 products-items col-11 col-sm-11 col-md-10">
                {relatedProducts}
            </div>
        </div>
    )
}