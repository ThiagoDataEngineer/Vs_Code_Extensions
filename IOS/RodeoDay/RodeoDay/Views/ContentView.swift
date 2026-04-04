import SwiftUI

struct ContentView: View {
    @StateObject private var viewModel = EventListViewModel()

    var body: some View {
        NavigationStack {
            VStack(spacing: 12) {
                filterBar

                if viewModel.isLoading {
                    Spacer()
                    ProgressView("Loading global events...")
                    Spacer()
                } else {
                    List(viewModel.filteredEvents) { event in
                        VStack(alignment: .leading, spacing: 4) {
                            Text(event.title)
                                .font(.headline)
                            Text("\(event.type.rawValue.capitalized) - \(event.source)")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                            Text(event.locationLabel)
                                .font(.subheadline)
                            Text(event.startsAt, style: .date)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .padding(.horizontal)
            .navigationTitle("RodeoDay")
            .task {
                await viewModel.load()
            }
        }
    }

    private var filterBar: some View {
        VStack(spacing: 8) {
            TextField("Search city, source, event", text: $viewModel.filters.searchText)
                .textFieldStyle(.roundedBorder)

            HStack {
                Picker("Country", selection: $viewModel.filters.selectedCountry) {
                    Text("All countries").tag(String?.none)
                    ForEach(viewModel.countries, id: \.self) { country in
                        Text(country).tag(String?.some(country))
                    }
                }

                Picker("Type", selection: $viewModel.filters.selectedType) {
                    Text("All types").tag(EventType?.none)
                    ForEach(EventType.allCases) { type in
                        Text(type.rawValue.capitalized).tag(EventType?.some(type))
                    }
                }
            }
            .pickerStyle(.menu)
        }
    }
}

#Preview {
    ContentView()
}
