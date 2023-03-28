import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";
import {useState, useEffect} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {backendUrl} from "../../config";

const Product = ({item}) => {
    const userId = localStorage.getItem("user_id");
    const [checked, setChecked] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        // const dat = {username: "jay"};

        // Check if the product is already a favorite
        try {
            // Check if the product is already a favorite
            const res = await axios.get(`${backendUrl}/favorite/${item._id}/${userId}`);
            const isFavorite = res.data.isFavorite;
            console.log(isFavorite);

            if (isFavorite) {
                // Remove the favorite
                await axios.delete(`${backendUrl}/favorite/${item._id}/${userId}`);
                setChecked(false);
                console.log("REMOVE FAVORITE");
            } else {
                // Add the favorite
                await axios.post(`${backendUrl}/favorite`, { userId, productId: item._id });
                setChecked(true);
                console.log("ADD FAVORITE");
            }
        } catch (error) {
            console.log(error);
        }


    };
    useEffect(() => {
        // Check if the product is already in the user's favorites list
        axios.get(`${backendUrl}/favorite/${item._id}/${userId}`)
            .then((res) => {
                setChecked(res.data.isFavorite);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [item._id, userId]);

    return (
        <div>
            <Link to={`/product/${item._id}`}>
                <ProductContainer key={item.id}>

                    <ProductImage src={`${backendUrl}/${item.image}`}/>

                    <ProductInfo>
                        <HeartIcon onClick={handleClick}>
                            <Checkbox
                                icon={<FavoriteBorder/>}
                                checkedIcon={<Favorite style={{color: "red"}}/>}
                                checked={checked}
                            />
                        </HeartIcon>
                    </ProductInfo>
                </ProductContainer>
            </Link>
            {/*// </Link>*/}
        </div>
    );
};

export default Product;

const HeartIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  transition: all 0.5s ease;
  cursor: pointer;
  opacity: 0;
`;

const ProductContainer = styled.div`

  flex: 1;
  margin: 5px;
  min-width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(189, 189, 189, 0.22);
  position: relative;

  &:hover ${ProductInfo} {
    opacity: 1;
  }

`;


const ProductImage = styled.img`
  height: 50%;
  z-index: 2;

`;
