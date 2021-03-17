//* @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import Card from 'common/layout/Card';
import Row from 'common/layout/Row';
import StonkViewer from 'StonkDashboard/StonkViewer';

export const StonkSection = ({ data, stonkMap }) => {
  const Title = css`
    font-size: 1.5em;
    padding-bottom: 0.5em;
  `;

  const StonkList = css`
    & > div {
      margin-left: 1em;
    }
    & > div:first-of-type {
      margin-left: 0em;
    }
  `;

  return (
    <Card padding={'0.5em 1em 1em'}>
      <div css={Title}>{data.name}</div>
      <Row cs={StonkList}>
        {data.symbols.map((symbol, i) => {
          return <StonkViewer {...stonkMap[symbol]} symbol={symbol} key={i} />;
        })}
      </Row>
    </Card>
  );
};

StonkSection.propTypes = {
  data: PropTypes.Object,
  stonkMap: PropTypes.Object,
};

export default StonkSection;
