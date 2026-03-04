import { useEffect, useState } from "react";
import ComponentRenderer from "../components/ComponentRenderer";
import type { ComponentNode } from "../types";

const PREVIEW_PRODUCTS = [
  {
    title: "Caneta Delineadora Mariana Saad by Océane - Eyeliner Pen",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    originalPrice: "R$ 91,90",
    price: "R$ 36,90",
    discount: "59.85",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Esponja para Maquiagem Klasme Black Sponge Extra Soft",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/b0f9449e-78bd-4cdd-90d3-c5d1ebb6fc7a-1.jpg",
    originalPrice: "R$ 34,90",
    price: "R$ 31,90",
    discount: "8.6",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Chaleira Elétrica Cadence 1,8L Inox Control 127V CEL850",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/9c3adfe3-00d6-4e1a-9e4f-be925067f2d6-1.jpg",
    originalPrice: "R$ 235,00",
    price: "R$ 235,00",
    discount: "0",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "B.O.B Kit – Shampoo Detox + Condicionador Hidratação Profunda",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/0df3ce18-7690-4dcd-b67c-c8795907585d-1.jpg",
    originalPrice: "R$ 120,00",
    price: "R$ 104,90",
    discount: "12.58",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Mon Guerlain Sparkling Bouquet Guerlain - Perfume Feminino - EDP",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/7ad1545f-fffd-4adf-a4b6-ade42031ec57-1.jpg",
    originalPrice: "R$ 689,00",
    price: "R$ 689,00",
    discount: "0",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Lápis para contorno Labial Dior Rouge Dior Contour",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/1e5072e6-4a00-47cd-b5a6-6129575e7937-1.jpg",
    originalPrice: "R$ 239,00",
    price: "R$ 239,00",
    discount: "0",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Gel de Limpeza Facial Cerave - Pele Normal a Oleosa",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/3edd9871-a8de-4dbd-8230-34c89ecef048-1.jpg",
    originalPrice: "R$ 64,90",
    price: "R$ 59,66",
    discount: "8.07",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Lápis Delineador para Olhos Clinique Quickliner for Eyes Intense",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/f46b6d70-850e-4139-92a6-ea6f46a40637-1.jpg",
    originalPrice: "R$ 219,00",
    price: "R$ 153,30",
    discount: "30",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title: "Colônia Gerânio Bourbon Phebo",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/e42425ad-c0c6-42a2-8eb9-cd1c75b0c7ac-1.jpg",
    originalPrice: "R$ 90,50",
    price: "R$ 55,72",
    discount: "38.43",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
  {
    title:
      "Ventilador de Mesa Cadence VTR410 Refresh Turbo Pro 6 Pás 3 Velocidades Preto 127V",
    url: "https://cdn.luxuryloyalty.com/media/product/detail/700428ba-7042-40a5-a92f-527850269808-1.jpg",
    originalPrice: "R$ 319,00",
    price: "R$ 319,00",
    discount: "0",
    shop: {
      name: "Shop Rock",
      avatar:
        "https://cdn.luxuryloyalty.com/media/product/detail/f148c0ad-a39a-4674-a59f-cad2f4b7e91b-1.jpg",
    },
  },
];

export default function Preview() {
  const [components, setComponents] = useState<ComponentNode[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("builder-components");
    if (saved) {
      setComponents(JSON.parse(saved));
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          gap: "20px",
        }}
      >
        {PREVIEW_PRODUCTS.map((product, idx) => (
          <div
            key={idx}
            style={{
              width: "358px",
              marginTop: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
              border: "1px solid #e1e4e8",
            }}
          >
            {/* The Actual Content (the post) */}
            <div style={{ backgroundColor: "#fff" }}>
              {components.map((node) => (
                <ComponentRenderer
                  key={`preview-${idx}-${node.id}`}
                  node={node}
                  selectedNodeId={null}
                  onSelect={() => {}}
                  dataContext={{ post: product }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
