import styled, { css, keyframes } from 'styled-components';

const fadeOutKey = keyframes`
  100% (
    background: #efefef;
  )
`;

const fadeOutAnim = props => {
  if (props.marked) {
    return css`${fadeOutKey} 3s linear forwards`;
  }
  return 'none';
}

export const EntryEl = styled.div`
  display: flex;
  border: 1px solid #eee;
  border-radius: 2px;
  margin: 10px;
  padding: 10px;
  background: ${props => props.marked ? 'yellow': 'transparent'};
  animation: ${fadeOutAnim}
`;

export const EntryName = styled.span`
  font-weight: bold;
`;

export const EntryCount = styled.span`
  opacity: 0.5;
  font-style: italic;
  display: inline-block;
  padding: 0 5px;
`;

export const EntryLocation = styled.span`
  font-style: italic;
  display: inline-block;
  padding: 0 5px;
`;

export const EntryRange = styled.span`
  opacity: 0.5;
  font-style: italic;
  display: inline-block;
  padding: 0 5px;
  font-size: 10px;
`;

export const EntryMarker = styled.span`
  display: none;
`;

export const EntryMarked = styled.span`
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  width: 10px;
  background: ${props => props.marked ? 'green': 'transparent' };
`;
