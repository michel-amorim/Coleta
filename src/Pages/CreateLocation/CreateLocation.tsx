import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import "./styles.css";
import logo from "../../assets/logo.svg";
import api from "../../services/api";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const CreateLocation: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    api.get("").then((response) => {
      setPhotos(response.data);
    });
  }, []);

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

  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedMapPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSelectedPhoto = useCallback(
    (id: number) => {
      const alreadyselected = selectedPhotos.findIndex((item) => item === id);

      if (alreadyselected >= 0) {
        const filteredPhotos = selectedPhotos.filter((item) => item !== id);
        setSelectedPhotos(filteredPhotos);
      } else {
        setSelectedPhotos([...selectedPhotos, id]);
      }
    },
    [selectedPhotos]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { city, email, name, uf, whatsapp } = formData;
      const [latitude, longetude] = selectedMapPosition;
      const items = selectedPhotos;

      const data = {
        city,
        email,
        name,
        uf,
        whatsapp,
        latitude,
        longetude,
        items,
      };

      await api.post("location", data);
    },
    [formData, selectedMapPosition, selectedPhotos]
  );

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

        <form onSubmit={handleSubmit}>
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
              {photos
                .map((photos) => (
                  <li
                    key={photos.id}
                    onClick={() => handleSelectedPhoto(photos.id)}
                    className={
                      selectedPhotos.includes(photos.id) ? "selected" : ""
                    }
                  >
                    <img
                      className="img-grid-control"
                      src={photos.url}
                      alt={photos.title}
                    />
                  </li>
                ))
                .slice(0, 6)}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar local de coleta</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
