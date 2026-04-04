import XCTest
@testable import RodeoDay

final class EventFilterTests: XCTestCase {
    @MainActor
    func testCountryFilterReturnsOnlyMatchingEvents() async {
        let vm = EventListViewModel(service: GlobalAggregatorService(providers: [
            StubProvider(events: [
                makeEvent(country: "United States", state: "Texas", type: .rodeo, source: "PRCA"),
                makeEvent(country: "Brazil", state: "Sao Paulo", type: .auction, source: "ABQM")
            ])
        ]))

        vm.filters.selectedCountry = "Brazil"

        await vm.load()
        XCTAssertEqual(vm.filteredEvents.count, 1)
        XCTAssertEqual(vm.filteredEvents.first?.country, "Brazil")
    }

    private func makeEvent(country: String, state: String, type: EventType, source: String) -> Event {
        Event(
            id: UUID(),
            title: "Sample",
            type: type,
            source: source,
            country: country,
            stateOrRegion: state,
            city: "City",
            startsAt: Date(),
            venue: "Venue",
            officialUrl: nil,
            latitude: nil,
            longitude: nil
        )
    }
}

private struct StubProvider: EventProvider {
    let sourceName: String = "Stub"
    let events: [Event]

    func fetchEvents() async throws -> [Event] {
        events
    }
}
