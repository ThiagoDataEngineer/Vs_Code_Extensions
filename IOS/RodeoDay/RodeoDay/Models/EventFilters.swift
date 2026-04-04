import Foundation

struct EventFilters: Equatable {
    var selectedCountry: String?
    var selectedStateOrRegion: String?
    var selectedType: EventType?
    var selectedSource: String?
    var searchText: String = ""

    static let empty = EventFilters()
}
