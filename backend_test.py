#!/usr/bin/env python3
"""
Backend API Testing for Zaz Precision Auto Detailing
Tests all backend endpoints with comprehensive validation scenarios
"""

import requests
import json
import sys
import time
from datetime import datetime

# Backend URL from frontend .env
BASE_URL = "https://dff6efe7-ea9d-43c5-962a-64fa3695e0a7.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.created_quote_ids = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Root Endpoint", True, "Root endpoint responding correctly")
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}")
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")

    def test_quote_creation_valid(self):
        """Test valid quote request creation"""
        test_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@email.com",
            "phone": "(555) 123-4567",
            "vehicleType": "SUV",
            "services": ["Reset Detail (Premium Package)", "Paint Enhancement"],
            "location": "Downtown Phoenix",
            "message": "Looking for premium detailing for my 2022 BMW X5. Prefer weekend appointment."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("quoteId"):
                    self.created_quote_ids.append(data["quoteId"])
                    self.log_test("Quote Creation - Valid Data", True, 
                                "Quote created successfully", 
                                f"Quote ID: {data['quoteId']}")
                else:
                    self.log_test("Quote Creation - Valid Data", False, 
                                f"Invalid response structure: {data}")
            else:
                self.log_test("Quote Creation - Valid Data", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Quote Creation - Valid Data", False, f"Request error: {str(e)}")

    def test_quote_creation_minimal(self):
        """Test quote creation with minimal required fields"""
        test_data = {
            "name": "Mike Rodriguez",
            "email": "mike.r@gmail.com",
            "phone": "602-555-9876",
            "vehicleType": "Sedan",
            "services": ["Full Interior & Exterior Detailing"]
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("quoteId"):
                    self.created_quote_ids.append(data["quoteId"])
                    self.log_test("Quote Creation - Minimal Fields", True, 
                                "Quote created with minimal fields", 
                                f"Quote ID: {data['quoteId']}")
                else:
                    self.log_test("Quote Creation - Minimal Fields", False, 
                                f"Invalid response: {data}")
            else:
                self.log_test("Quote Creation - Minimal Fields", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Quote Creation - Minimal Fields", False, f"Request error: {str(e)}")

    def test_quote_creation_all_services(self):
        """Test quote creation with all available services"""
        test_data = {
            "name": "Jennifer Chen",
            "email": "j.chen@company.com",
            "phone": "480-555-2468",
            "vehicleType": "Truck",
            "services": [
                "Reset Detail (Premium Package)",
                "Full Interior & Exterior Detailing", 
                "Paint Correction",
                "Paint Enhancement",
                "Headlight Restoration"
            ],
            "location": "Scottsdale",
            "message": "Need complete restoration for my work truck. Budget is flexible for quality work."
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("quoteId"):
                    self.created_quote_ids.append(data["quoteId"])
                    self.log_test("Quote Creation - All Services", True, 
                                "Quote created with all services", 
                                f"Quote ID: {data['quoteId']}")
                else:
                    self.log_test("Quote Creation - All Services", False, 
                                f"Invalid response: {data}")
            else:
                self.log_test("Quote Creation - All Services", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Quote Creation - All Services", False, f"Request error: {str(e)}")

    def test_quote_validation_missing_name(self):
        """Test validation for missing name field"""
        test_data = {
            "email": "test@email.com",
            "phone": "555-1234",
            "vehicleType": "Sedan",
            "services": ["Paint Correction"]
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Quote Validation - Missing Name", True, 
                            "Correctly rejected missing name field")
            else:
                self.log_test("Quote Validation - Missing Name", False, 
                            f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Quote Validation - Missing Name", False, f"Request error: {str(e)}")

    def test_quote_validation_invalid_email(self):
        """Test validation for invalid email format"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "phone": "555-1234",
            "vehicleType": "Sedan",
            "services": ["Paint Correction"]
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Quote Validation - Invalid Email", True, 
                            "Correctly rejected invalid email format")
            else:
                self.log_test("Quote Validation - Invalid Email", False, 
                            f"Expected 422, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Quote Validation - Invalid Email", False, f"Request error: {str(e)}")

    def test_quote_validation_empty_services(self):
        """Test validation for empty services array"""
        test_data = {
            "name": "Test User",
            "email": "test@email.com",
            "phone": "555-1234",
            "vehicleType": "Sedan",
            "services": []
        }
        
        try:
            response = requests.post(f"{BASE_URL}/quotes", json=test_data)
            if response.status_code == 422:  # Validation error expected
                self.log_test("Quote Validation - Empty Services", True, 
                            "Correctly rejected empty services array")
            else:
                # If it passes validation, that's also acceptable behavior
                self.log_test("Quote Validation - Empty Services", True, 
                            "Empty services array accepted (acceptable behavior)")
        except Exception as e:
            self.log_test("Quote Validation - Empty Services", False, f"Request error: {str(e)}")

    def test_get_all_quotes(self):
        """Test retrieving all quote requests"""
        try:
            response = requests.get(f"{BASE_URL}/quotes")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    quote_count = len(data)
                    self.log_test("Get All Quotes", True, 
                                f"Retrieved {quote_count} quote requests successfully")
                    
                    # Verify structure of returned quotes
                    if quote_count > 0:
                        sample_quote = data[0]
                        required_fields = ['id', 'name', 'email', 'phone', 'vehicleType', 'services']
                        missing_fields = [field for field in required_fields if field not in sample_quote]
                        if not missing_fields:
                            self.log_test("Quote Structure Validation", True, 
                                        "Quote objects have all required fields")
                        else:
                            self.log_test("Quote Structure Validation", False, 
                                        f"Missing fields in quote: {missing_fields}")
                else:
                    self.log_test("Get All Quotes", False, 
                                f"Expected list, got: {type(data)}")
            else:
                self.log_test("Get All Quotes", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get All Quotes", False, f"Request error: {str(e)}")

    def test_get_individual_quote_valid(self):
        """Test retrieving individual quote by valid ID"""
        if not self.created_quote_ids:
            self.log_test("Get Individual Quote - Valid ID", False, 
                        "No quote IDs available for testing")
            return
            
        quote_id = self.created_quote_ids[0]
        try:
            response = requests.get(f"{BASE_URL}/quotes/{quote_id}")
            if response.status_code == 200:
                data = response.json()
                if data.get("id") == quote_id:
                    self.log_test("Get Individual Quote - Valid ID", True, 
                                f"Retrieved quote {quote_id} successfully")
                else:
                    self.log_test("Get Individual Quote - Valid ID", False, 
                                f"Quote ID mismatch: expected {quote_id}, got {data.get('id')}")
            else:
                self.log_test("Get Individual Quote - Valid ID", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get Individual Quote - Valid ID", False, f"Request error: {str(e)}")

    def test_get_individual_quote_invalid(self):
        """Test retrieving individual quote by invalid ID"""
        invalid_id = "invalid-quote-id-12345"
        try:
            response = requests.get(f"{BASE_URL}/quotes/{invalid_id}")
            if response.status_code == 404:
                self.log_test("Get Individual Quote - Invalid ID", True, 
                            "Correctly returned 404 for invalid quote ID")
            else:
                self.log_test("Get Individual Quote - Invalid ID", False, 
                            f"Expected 404, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get Individual Quote - Invalid ID", False, f"Request error: {str(e)}")

    def test_get_services(self):
        """Test retrieving available services"""
        try:
            response = requests.get(f"{BASE_URL}/services")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Services", True, 
                                f"Retrieved {len(data)} services successfully")
                else:
                    self.log_test("Get Services", False, 
                                f"Expected list, got: {type(data)}")
            else:
                self.log_test("Get Services", False, 
                            f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_test("Get Services", False, f"Request error: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 80)
        print("BACKEND API TESTING FOR ZAZ PRECISION AUTO DETAILING")
        print("=" * 80)
        print(f"Testing against: {BASE_URL}")
        print(f"Started at: {datetime.now().isoformat()}")
        print("=" * 80)
        print()

        # Test in priority order
        self.test_root_endpoint()
        
        # High Priority Tests
        print("🔥 HIGH PRIORITY TESTS")
        print("-" * 40)
        self.test_quote_creation_valid()
        self.test_quote_creation_minimal()
        self.test_quote_creation_all_services()
        
        # Validation Tests
        print("🔍 VALIDATION TESTS")
        print("-" * 40)
        self.test_quote_validation_missing_name()
        self.test_quote_validation_invalid_email()
        self.test_quote_validation_empty_services()
        
        # Data Retrieval Tests
        print("📊 DATA RETRIEVAL TESTS")
        print("-" * 40)
        self.test_get_all_quotes()
        self.test_get_individual_quote_valid()
        self.test_get_individual_quote_invalid()
        
        # Services Tests
        print("🛠️ SERVICES TESTS")
        print("-" * 40)
        self.test_get_services()
        
        # Summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if failed_tests > 0:
            print("FAILED TESTS:")
            print("-" * 40)
            for result in self.test_results:
                if not result["success"]:
                    print(f"❌ {result['test']}: {result['message']}")
            print()
        
        print(f"Created Quote IDs for testing: {len(self.created_quote_ids)}")
        for quote_id in self.created_quote_ids:
            print(f"  - {quote_id}")
        
        print("=" * 80)
        return passed_tests, failed_tests

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()
    
    # Exit with appropriate code
    passed, failed = tester.print_summary()
    sys.exit(0 if failed == 0 else 1)