import React, { ChangeEvent, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import "./styles.css";
import logo from "../../assets/logo.svg";
import api from "../../services/api";

interface Item {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const CreateLocation: React.FC = () => {
  const [Items, setItems] = useState<Item[]>([]);

  const [selectedMapPosition, setSelectedMapPosition] = useState<
    [number, number]
  >([0, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: "",
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    api.get("").then((response) => {
      setItems(response.data);
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent): void {
    setSelectedMapPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectedPhoto(id: number) {
    const alreadyselected = selectedItems.findIndex((item) => item === id);

    if (alreadyselected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  return (
    <div id="page-create-location">
      <div className="content">
        <header>
          <img src={logo} alt="Coleta Seletiva" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para Home
          </Link>
        </header>

        <form>
          <h1>
            Cadastro do <br /> local de coleta
          </h1>
          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Marque o endereço no mapa</span>
            </legend>
            <Map
              center={[-23.0003709, -43.365895]}
              zoom={14}
              onclick={handleMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedMapPosition} />
            </Map>
            <div className="field-group">
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="uf">Estado</label>
                <input
                  type="text"
                  name="uf"
                  id="uf"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens coletados</h2>
              <span>Você pode marcar um ou mais ítens</span>
            </legend>
            <ul className="items-grid">
              {Items.map((Items) => (
                <li
                  key={Items.id}
                  onClick={() => handleSelectedPhoto(Items.id)}
                  className={selectedItems.includes(Items.id) ? "selected" : ""}
                >
                  <img
                    className="img-grid-control"
                    src={Items.url}
                    alt={Items.title}
                  />
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar local de coleta</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
