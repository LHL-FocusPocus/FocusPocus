import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
test('renders learn react link', function () {
    var getByText = render(React.createElement(App, null)).getByText;
    var linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
//# sourceMappingURL=App.test.js.map