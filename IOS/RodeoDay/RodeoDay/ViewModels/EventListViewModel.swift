import Foundation

@MainActor
final class EventListViewModel: ObservableObject {
    @Published private(set) var events: [Event] = []
    @Published var filters: EventFilters = .empty
    @Published private(set) var isLoading = false

    private let service: GlobalAggregatorService

    init(service: GlobalAggregatorService = GlobalAggregatorService()) {
        self.service = service
    }

    var filteredEvents: [Event] {
        events.filter { event in
            matchesCountry(event)
                && matchesState(event)
                && matchesType(event)
                && matchesSource(event)
                && matchesSearch(event)
        }
    }

    var countries: [String] {
        Array(Set(events.map(\.country))).sorted()
    }

    var statesOrRegions: [String] {
        Array(Set(events.map(\.stateOrRegion))).sorted()
    }

    var sources: [String] {
        Array(Set(events.map(\.source))).sorted()
    }

    func load() async {
        isLoading = true
        events = await service.fetchAllEvents()
        isLoading = false
    }

    private func matchesCountry(_ event: Event) -> Bool {
        guard let selected = filters.selectedCountry else { return true }
        return event.country.caseInsensitiveCompare(selected) == .orderedSame
    }

    private func matchesState(_ event: Event) -> Bool {
        guard let selected = filters.selectedStateOrRegion else { return true }
        return event.stateOrRegion.caseInsensitiveCompare(selected) == .orderedSame
    }

    private func matchesType(_ event: Event) -> Bool {
        guard let selected = filters.selectedType else { return true }
        return event.type == selected
    }

    private func matchesSource(_ event: Event) -> Bool {
        guard let selected = filters.selectedSource else { return true }
        return event.source.caseInsensitiveCompare(selected) == .orderedSame
    }

    private func matchesSearch(_ event: Event) -> Bool {
        let q = filters.searchText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !q.isEmpty else { return true }

        let haystack = [
            event.title,
            event.city,
            event.stateOrRegion,
            event.country,
            event.source,
            event.venue
        ].joined(separator: " ")

        return haystack.localizedCaseInsensitiveContains(q)
    }
}
