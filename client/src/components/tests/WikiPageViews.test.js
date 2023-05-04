import '@testing-library/jest-dom'
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import WikiPageViews from '../WikiPageViews';
import * as wikiFunctions from '../../api/WikiAPI';
import * as countryFunctions from '../../api/Countries';
import { mockWikiArticlesByDate, mockWikiArticlesByCountry, mockCountries } from './MockData';

beforeEach(() => {
    const mockGetArticlesByPageViewsForDate = jest.spyOn(wikiFunctions, 'getArticlesByPageViewsForDate');
    mockGetArticlesByPageViewsForDate.mockResolvedValue(mockWikiArticlesByDate);

    const mockGetArticlesByPageViewsForCountryAndDate = jest.spyOn(wikiFunctions, 'getArticlesByPageViewsForCountryAndDate');
    mockGetArticlesByPageViewsForCountryAndDate.mockResolvedValue(mockWikiArticlesByCountry);

    const mockGetAllCountries = jest.spyOn(countryFunctions, 'getAllCountries');
    mockGetAllCountries.mockResolvedValue(mockCountries);
});

afterEach(() => {
    jest.restoreAllMocks();
})

test("<WikiPageViews/> shows articles", async () => {
    render(<WikiPageViews />);

    await waitFor(() => {
        const articleItem = screen.queryByTestId("article-item-0");
        expect(articleItem).toBeInTheDocument();
    });
});

test("<WikiPageViews/> handles empty article list", async () => {
    render(<WikiPageViews />);

    const mockGetArticlesByPageViewsForDate = jest.spyOn(wikiFunctions, 'getArticlesByPageViewsForDate');
    mockGetArticlesByPageViewsForDate.mockResolvedValue([]);

    await waitFor(() => {
        const articleItem = screen.queryByTestId("no-articles");
        expect(articleItem).toBeInTheDocument();
    });
});