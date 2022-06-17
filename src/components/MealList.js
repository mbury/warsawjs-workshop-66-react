import * as React from 'react';
import { Button, Item, Label, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MealSizeWithHOC from './MealSize';

const MealList = ({ meals, onSelect }) => (
  <Item.Group divided>
    {meals.map((meal) => (
      <MealCard id={meal.id} key={meal.id} meal={meal} onSelect={onSelect} />
    ))}
  </Item.Group>
);

export default MealList;

MealList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

MealList.defaultProps = {
  meals: [],
  onSelect: undefined,
};

const MealCard = (props) => {
  const { meal, onSelect } = props;

  return (
    <Item>
      <Item.Image
        src={`${meal.image}?lock=${meal.id
          .replace(/\D/g, '')
          .replace(/0/g, '')
          .slice(3, 6)}`}
      />
      <Item.Content>
        <Item.Header as="a">{meal.title}</Item.Header>
        <Item.Meta>
          {meal.location.address} (dostawa {meal.location.delivery} min)
        </Item.Meta>
        <Item.Description style={{ minHeight: '76px' }}>
          <div style={{ float: 'right' }}>
            <Label tag size={'huge'}>
              {meal.price.amount} zł
            </Label>
          </div>
          Średnia ocena:{' '}
          <Rating
            disabled
            maxRating={10}
            defaultRating={Math.round(meal.rating.average)}
            icon="star"
            size="small"
          />
          <div>
            Ilość opinii: <strong>{meal.rating.reviews}</strong>
          </div>
          <div>
            Dostawa wliczone w cenę:{' '}
            <strong>{meal.price.delivery ? 'TAK' : 'NIE'}</strong>
          </div>
          <div>
            Kraj pochodzenia: <strong>{meal.origin}</strong>
          </div>
        </Item.Description>
        <Item.Extra>
          {onSelect && (
            <Button onClick={() => onSelect(meal)} primary floated="right">
              Wybierz
            </Button>
          )}
          <MealSizeWithHOC demand={meal.size} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};
