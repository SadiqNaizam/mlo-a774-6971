import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, LocateFixed, X, Search } from 'lucide-react';
import { toast } from 'sonner';

interface LocationSearchBarProps {
  onLocationSet: (location: string | { lat: number; lon: number }) => void;
  initialLocation?: string;
  placeholder?: string;
}

const mockAutocompleteSuggestions = [
  "123 Main St, Anytown, USA",
  "Central Park, New York, NY",
  "Downtown, Metropolis",
  "Suburbia Heights",
];

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  onLocationSet,
  initialLocation = '',
  placeholder = "Enter delivery address",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    console.log('LocationSearchBar loaded');
  }, []);

  useEffect(() => {
    if (initialLocation) {
      setSearchTerm(initialLocation);
    }
  }, [initialLocation]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      // Mock autocomplete: filter suggestions based on input
      setSuggestions(
        mockAutocompleteSuggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onLocationSet(suggestion);
    toast.info(`Location set to: ${suggestion}`);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setSuggestions([]);
    // Optionally call onLocationSet with empty or default value
    // onLocationSet(''); 
    console.log('Location input cleared');
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      toast.loading('Fetching your current location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
          setSearchTerm(locationString);
          onLocationSet({ lat: latitude, lon: longitude });
          setSuggestions([]);
          setIsLoadingLocation(false);
          toast.dismiss();
          toast.success('Current location set!');
          console.log('Current location fetched:', { latitude, longitude });
        },
        (error) => {
          setIsLoadingLocation(false);
          toast.dismiss();
          toast.error(`Error fetching location: ${error.message}`);
          console.error('Error fetching geolocation:', error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
      console.error('Geolocation not supported');
    }
  };
  
  const handleSubmitSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
        onLocationSet(searchTerm.trim());
        setSuggestions([]); // Clear suggestions after search
        toast.info(`Searching for location: ${searchTerm.trim()}`);
    }
  };


  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmitSearch} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-10 w-full" // Padding for icon and clear button
            aria-label="Delivery location search"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClearInput}
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          aria-label="Use current location"
        >
          <LocateFixed className={`h-5 w-5 ${isLoadingLocation ? 'animate-spin' : ''}`} />
        </Button>
         <Button 
            type="submit"
            variant="default"
            size="icon"
            aria-label="Search location"
            disabled={!searchTerm.trim()}
        >
            <Search className="h-5 w-5" />
        </Button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearchBar;